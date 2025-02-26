import type { Message } from "@/types";
import { axiosInstance } from "../axios";

export async function createMessage(data: { chatId: string; content: string }) {
  const res = await axiosInstance.post("/messages", data);
  return res.data as Message;
}

export async function getMessages(chatId: string) {
  const res = await axiosInstance.get(`/messages?chatId=${chatId}`);
  return res.data as Message[];
}
