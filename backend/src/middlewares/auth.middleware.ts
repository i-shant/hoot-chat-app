import type { IPayload, IRequestWithUser } from "../types";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.model";

export const protect = asyncHandler(
  async (req: IRequestWithUser, res, next) => {
    let token: string | undefined;

    token = req.cookies.jwt;

    if (token) {
      try {
        const { userId } = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as IPayload;

        const user = await User.findById(userId).select("-password");

        if (!user) {
          res.status(401);
          throw new Error("Not authorized, user not found");
        }

        req.user = user;

        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized, invalid token");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);
