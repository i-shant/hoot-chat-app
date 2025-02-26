import type { IRequestWithUser } from "../types";
import asyncHandler from "express-async-handler";
import User from "../models/user.model";

// @desc    Get all users by name
// @route   GET /api/users?q=
// @access  Private
export const getUsers = asyncHandler(async (req: IRequestWithUser, res) => {
  const { q } = req.query;
  const { user } = req;

  if (!q) {
    res.json([]);
    return;
  }

  const users = await User.find({
    name: { $regex: q, $options: "i" },
    _id: { $ne: user?._id },
  }).select("-password");

  res.json(users);
});

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private
export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password");

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});
