import express from "express";
import { getMe, login, register } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/register", (req, res, next) => {
  register(req, res).catch(next);
});

router.post("/login", (req, res, next) => {
  login(req, res).catch(next);
});

router.get(
  "/me",
  (req, res, next) => {
    authenticate(req, res, next);
  },
  (req, res, next) => {
    getMe(req, res).catch(next);
  }
);

export default router;
