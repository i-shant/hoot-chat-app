import type { LoginData, SignUpData, User } from "@/types";
import { axiosInstance } from "../axios";

export async function getUser() {
  const res = await axiosInstance.get("/auth");
  return res.data as User;
}

export async function login(data: LoginData) {
  await axiosInstance.post("/auth/login", data);
}

export async function signUp(data: SignUpData) {
  await axiosInstance.post("/auth/register", data);
}

export async function logout() {
  await axiosInstance.post("/auth/logout");
}
