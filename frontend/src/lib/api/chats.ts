import { Chat } from "@/types";
import { axiosInstance } from "../axios";

export async function getChats(): Promise<Chat[]> {
  const res = await axiosInstance.get("/chats");
  return res.data;
}

export async function getChatById(chatId: string): Promise<Chat> {
  const res = await axiosInstance.get(`/chats/${chatId}`);
  return res.data;
}

export async function createChat(otherUserId: string): Promise<Chat> {
  const res = await axiosInstance.post("/chats", { otherUserId });
  return res.data;
}
