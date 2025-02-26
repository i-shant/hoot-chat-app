import type { IRequestWithUser } from "../types";
import asyncHandler from "express-async-handler";
import { emitTo } from "../config/socket";
import Chat from "../models/chat.model";
import User from "../models/user.model";

// @desc    Get all chats
// @route   GET /api/chats
// @access  Private
export const getChats = asyncHandler(async (req: IRequestWithUser, res) => {
  const { user } = req;

  if (user) {
    const chats = await Chat.find({ members: user?._id }).populate({
      path: "members lastMessage",
      select: "-password",
    });

    res.json(chats);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get chat by id
// @route   GET /api/chats/:id
// @access  Private
export const getChatById = asyncHandler(async (req: IRequestWithUser, res) => {
  const { id } = req.params;
  const { user } = req;

  const chat = await Chat.findOne({ _id: id, members: user?._id }).populate({
    path: "members lastMessage",
    select: "-password",
  });

  if (chat) {
    res.json(chat);
  } else {
    res.status(404);
    throw new Error("Chat not found");
  }
});

// @desc    Create a new chat
// @route   POST /api/chats
// @access  Private
export const createChat = asyncHandler(async (req: IRequestWithUser, res) => {
  const { user } = req;
  const { otherUserId } = req.body;

  if (!otherUserId) {
    res.status(400);
    throw new Error("Invalid user id");
  }

  const otherUser = await User.findById(otherUserId);

  if (!otherUser) {
    res.status(400);
    throw new Error("Invalid user");
  }

  const chatExists = await Chat.findOne({
    members: {
      $all: [user?.id, otherUserId],
    },
  }).populate({
    path: "members lastMessage",
    select: "-password",
  });

  if (chatExists) {
    res.json(chatExists);
    return;
  }

  const chat = await Chat.create({
    members: [user?.id, otherUserId],
    lastMessage: null,
  });

  if (!chat) {
    res.status(400);
    throw new Error("Invalid chat data");
  }

  const populatedChat = await chat.populate({
    path: "members lastMessage",
    select: "-password",
  });

  /* notify other user of the new chat in realtime */
  emitTo(otherUserId, { event: "chat:new", arg: populatedChat });

  res.status(201).json(populatedChat);
});
