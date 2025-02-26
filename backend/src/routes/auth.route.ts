import { Router } from "express";
import {
  login,
  logout,
  register,
  verify,
} from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/", protect, verify);

export default router;
