import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import mediaRoutes from "./routes/media.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Auth Service is running ✅");
});

app.use("/api/auth", authRoutes);
app.use("/api/media", mediaRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Auth Service running on http://localhost:${PORT}`);
});
