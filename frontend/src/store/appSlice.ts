import { StateCreator } from "zustand";
import { SocketSlice } from "./socketSlice";

export interface AppSlice {
  onlineUsers: string[];
  isSidebarOpen: boolean;
  isAddUserDialogOpen: boolean;
  setOnlineUsers: (userIds: string[]) => void;
  setSidebarOpen: (isSidebarOpen: boolean) => void;
  setAddUserDialogOpen: (isAddUserDialogOpen: boolean) => void;
  hideAddUserDialog: () => void;
}

export const createAppSlice: StateCreator<
  AppSlice & SocketSlice,
  [],
  [],
  AppSlice
> = (set) => ({
  onlineUsers: [],
  isSidebarOpen: false,
  isAddUserDialogOpen: false,

  setOnlineUsers: (userIds: string[]) => set({ onlineUsers: userIds }),
  setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
  setAddUserDialogOpen: (isAddUserDialogOpen) => set({ isAddUserDialogOpen }),
  hideAddUserDialog: () => set({ isAddUserDialogOpen: false }),
});
