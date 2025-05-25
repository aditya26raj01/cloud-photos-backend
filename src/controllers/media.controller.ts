import { Request, Response } from "express";
import { getDownloadUrl, getUploadUrl } from "../utils/s3";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

const prisma = new PrismaClient();

const uploadSchema = z.object({
  filename: z.string(),
  contentType: z.string(),
  size: z.number(),
});

export const generateUploadUrl = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { filename, contentType, size } = uploadSchema.parse(req.body);
    const key = `${req.userId}/${Date.now()}-${filename}`;

    const uploadUrl = await getUploadUrl(key, contentType);

    const fileRecord = await prisma.media.create({
      data: {
        userId: req.userId!,
        filename,
        url: `https://${process.env.CUSTOM_AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`,
        size,
        type: contentType,
      },
    });

    return res.json({
      uploadUrl,
      file: fileRecord,
    });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};

export const getAllMedia = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const media = await prisma.media.findMany({
      where: { userId: req.userId! },
      orderBy: { createdAt: "desc" }, // Most recent first
    });

    return res.json({ media });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const getDownloadLink = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const mediaId = req.params.id;

    const media = await prisma.media.findUnique({
      where: { id: mediaId },
    });

    if (!media || media.userId !== req.userId) {
      return res.status(403).json({ error: "Unauthorized or not found" });
    }

    const key = media.url.split(`.amazonaws.com/`)[1];
    const downloadUrl = await getDownloadUrl(key);

    return res.json({ downloadUrl });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
