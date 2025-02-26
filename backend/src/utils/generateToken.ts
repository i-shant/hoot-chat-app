import type { Response } from "express";
import jwt from "jsonwebtoken";
import { IPayload } from "../types";

export default function generateToken(res: Response, userId: string) {
  const payload: IPayload = { userId };
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
}
