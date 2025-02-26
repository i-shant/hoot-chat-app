import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { createMessage, getMessages } from "../controllers/message.controller";

const router = Router();

router.route("/").get(protect, getMessages).post(protect, createMessage);

export default router;
