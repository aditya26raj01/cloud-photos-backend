import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
dotenv.config();

const s3Client = new S3Client({
  region: process.env.CUSTOM_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.CUSTOM_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CUSTOM_AWS_SECRET_ACCESS_KEY!,
  },
});

export const getUploadUrl = async (key: string, contentType: string) => {
  const command = new PutObjectCommand({
    Bucket: process.env.CUSTOM_AWS_BUCKET_NAME!,
    Key: key,
    ContentType: contentType,
  });

  return getSignedUrl(s3Client, command, { expiresIn: 60 * 5 }); // 5 minutes
};

export const getDownloadUrl = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: process.env.CUSTOM_AWS_BUCKET_NAME!,
    Key: key,
  });

  return getSignedUrl(s3Client, command, { expiresIn: 60 * 60 }); // 1 hour
};
