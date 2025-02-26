import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { getUserById, getUsers } from "../controllers/user.controller";

const router = Router();

router.get("/", protect, getUsers);
router.get("/:id", protect, getUserById);

export default router;
