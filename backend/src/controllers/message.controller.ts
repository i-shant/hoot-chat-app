import type { IRequestWithUser } from "../types";
import asyncHandler from "express-async-handler";
import { emitTo } from "../config/socket";
import Chat from "../models/chat.model";
import Message from "../models/message.model";

// @desc    Get all messages
// @route   GET /messages?chatId=
// @access  Private
export const getMessages = asyncHandler(async (req: IRequestWithUser, res) => {
  const { user } = req;
  const { chatId } = req.query;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    res.status(404);
    throw new Error("Chat not found");
  }

  if (!chat.members.includes(user?.id)) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  const messages = await Message.find({ chat: chat.id });

  res.status(200).json(messages);
});

// @desc    Create a new message
// @route   POST /api/messages
// @access  Private
export const createMessage = asyncHandler(
  async (req: IRequestWithUser, res) => {
    const { user } = req;
    const { chatId, content } = req.body;

    if (!user) {
      res.status(401);
      throw new Error("Unauthorized");
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

    const message = await Message.create({
      sender: user.id,
      content: content,
      chat: chat.id,
      readBy: [user.id],
    });

    if (!message) {
      res.status(400);
      throw new Error("Invalid message data");
    }

    // Realtime message update
    const receiverId = chat.members.find(
      (memberId) => memberId.toString() !== message.sender.toString()
    );

    if (receiverId) {
      emitTo(receiverId.toString(), { event: "message", arg: message });
    }

    chat.lastMessage = message.id;
    await chat.save();

    res.status(201).json(message);
  }
);
