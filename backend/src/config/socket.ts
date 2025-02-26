import type { EmitData } from "../types";
import { createServer } from "http";
import express from "express";
import { Server, Socket } from "socket.io";
import corsOptions from "./corsOptions";
import Chat from "../models/chat.model";

export const app = express();
export const server = createServer(app);
export const io = new Server(server, {
  cors: corsOptions,
});

export const onlineUsers = new Map<string, string>();

export function onConnection(socket: Socket) {
  const userId = socket.handshake.auth.userId;

  if (userId) {
    async function onTypingStart(chatId: string) {
      const chat = await Chat.findById(chatId);

      if (!chat) return;

      const otherUserId = chat.members.find(
        (member) => member.toString() !== userId
      );
      if (!otherUserId || !onlineUsers.has(otherUserId.toString())) return;

      const otherUserSocketId = onlineUsers.get(otherUserId.toString());

      if (!otherUserSocketId) return;

      io.to(otherUserSocketId).emit("typing:started", chatId);
    }

    async function onTypingStop(chatId: string) {
      const chat = await Chat.findById(chatId);

      if (!chat) return;

      const otherUserId = chat.members.find(
        (member) => member.toString() !== userId
      );
      if (!otherUserId || !onlineUsers.has(otherUserId.toString())) return;

      const otherUserSocketId = onlineUsers.get(otherUserId.toString());

      if (!otherUserSocketId) return;

      io.to(otherUserSocketId).emit("typing:stopped", chatId);
    }

    function onDisconnect() {
      if (userId) {
        onlineUsers.delete(userId);
        io.emit("online_users", Array.from(onlineUsers.keys()));
      }
    }

    socket.on("typing:start", onTypingStart);
    socket.on("typing:stop", onTypingStop);
    socket.on("disconnect", onDisconnect);

    onlineUsers.set(userId, socket.id);
    io.emit("online_users", Array.from(onlineUsers.keys()));
  }
}

export function emitTo<T>(receiverId: string, data: EmitData<T>) {
  const { event, arg } = data;

  if (onlineUsers.has(receiverId)) {
    const socketId = onlineUsers.get(receiverId);

    if (!socketId) return;

    io.to(socketId).emit(event, arg);
  }
}
