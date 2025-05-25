import { Request, Response } from "express";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/hash";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";

const prisma = new PrismaClient();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const register = async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body);

    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashed = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashed,
      },
    });

    return res.status(201).json({
      message: "User registered",
      user: { id: user.id, email: user.email },
    });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const login = async (req: Request, res: Response) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(data.password, user.password);

    if (!valid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user.id);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, email: true, createdAt: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err: any) {
    return res.status(500).json({ error: "Server error" });
  }
};
