import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import {
  createChat,
  getChatById,
  getChats,
} from "../controllers/chat.controller";

const router = Router();

router.route("/").get(protect, getChats).post(protect, createChat);
router.get("/:id", protect, getChatById);

export default router;
