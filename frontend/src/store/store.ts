import { create } from "zustand";
import { AppSlice, createAppSlice } from "./appSlice";
import { createSocketSlice, SocketSlice } from "./socketSlice";

export const useStore = create<AppSlice & SocketSlice>()((...a) => ({
  ...createAppSlice(...a),
  ...createSocketSlice(...a),
}));
