import express from "express";
import {
  generateUploadUrl,
  getAllMedia,
  getDownloadLink,
} from "../controllers/media.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.post(
  "/generate-upload-url",
  (req, res, next) => {
    authenticate(req, res, next);
  },
  (req, res, next) => {
    generateUploadUrl(req, res).catch(next);
  }
);

router.get(
  "/",
  (req, res, next) => {
    authenticate(req, res, next);
  },
  (req, res, next) => {
    getAllMedia(req, res).catch(next);
  }
);

router.get(
  "/:id/download",
  (req, res, next) => {
    authenticate(req, res, next);
  },
  (req, res, next) => {
    getDownloadLink(req, res).catch(next);
  }
);

export default router;
