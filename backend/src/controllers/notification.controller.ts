import type { IRequestWithUser } from "../types";
import asyncHandler from "express-async-handler";
import Chat from "../models/chat.model";
import Message from "../models/message.model";

// @desc    Get all notifications
// @route   GET /api/notifications
// @access  Private
export const getNotifications = asyncHandler(
  async (req: IRequestWithUser, res) => {
    const { user } = req;

    if (!user) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const messages = await Message.find({ readBy: { $ne: user.id } });

    const notifications = messages.map((message) => message.chat);

    res.json(notifications);
  }
);

// @desc    Mark messages as read in a chat
// @route   POST /api/notifications/read
// @access  Private
export const markAsRead = asyncHandler(async (req: IRequestWithUser, res) => {
  const { user } = req;
  const { chatId } = req.body;

  if (!user) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  if (!chatId) {
    res.status(400);
    throw new Error("Chat not found");
  }

  const chat = await Chat.findById(chatId);

  if (!chat) {
    res.status(404);
    throw new Error("Chat not found");
  }

  if (!chat.members.includes(user?.id)) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  await Message.updateMany(
    { chat: chatId, readBy: { $ne: user.id } },
    { $addToSet: { readBy: user.id } }
  );

  res.json({ message: "Success" });
});
