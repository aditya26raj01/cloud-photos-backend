import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http";

import authRoutes from "./src/routes/auth.routes";
import mediaRoutes from "./src/routes/media.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Auth Service is running ✅");
});

app.use("/api/auth", authRoutes);
app.use("/api/media", mediaRoutes);

export const handler = serverless(app); // 🔥 Export Lambda handler
