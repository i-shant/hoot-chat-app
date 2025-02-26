import { axiosInstance } from "../axios";

export async function getNotifications() {
  const res = await axiosInstance.get("/notifications");
  return new Set(res.data as string[]);
}

export async function markAsRead(chatId: string) {
  await axiosInstance.post("/notifications/read", { chatId });
}
