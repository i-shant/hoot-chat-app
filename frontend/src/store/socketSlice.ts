import { io, Socket } from "socket.io-client";
import { StateCreator } from "zustand";
import { AppSlice } from "./appSlice";

export interface SocketSlice {
  socket: Socket | null;
  connect: (userId: string) => void;
  disconnect: () => void;
  emit: (event: string, data: any) => void;
}

export const createSocketSlice: StateCreator<
  AppSlice & SocketSlice,
  [],
  [],
  SocketSlice
> = (set, get) => ({
  socket: null,

  connect: (userId) => {
    if (get().socket) return;

    const newSocket = io(import.meta.env.VITE_API_BASE_URL, {
      auth: { userId },
    });

    newSocket.on("online_users", get().setOnlineUsers);

    set({ socket: newSocket });
  },

  disconnect: () => {
    get().socket?.disconnect();
    set({ socket: null });
    get().setOnlineUsers([]);
  },

  emit: (event, data) => {
    get().socket?.emit(event, data);
  },
});
