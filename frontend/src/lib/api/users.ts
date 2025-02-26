import { User } from "@/types";
import { axiosInstance } from "../axios";

export async function getUsers(q?: string) {
  const res = await axiosInstance.get("/users", {
    params: { q },
  });
  return res.data as User[];
}

export async function getUserById(userId: string) {
  const res = await axiosInstance.get(`/users/${userId}`);
  return res.data as User;
}
