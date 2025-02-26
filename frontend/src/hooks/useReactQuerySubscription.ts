import type { Chat, Message } from "@/types";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/store/store";
import { useUser } from "./auth/useUser";
import { QUERY_KEYS } from "@/lib/constants";

export const useReactQuerySubscription = () => {
  const queryClient = useQueryClient();
  const { data: authUser } = useUser();
  const socket = useStore((state) => state.socket);
  const connect = useStore((state) => state.connect);

  useEffect(() => {
    if (!authUser?._id) return;

    connect(authUser._id);

    socket?.on("chat:new", (chat: Chat) => {
      queryClient.setQueryData([QUERY_KEYS.chats], (oldChats: Chat[] = []) => {
        return [...oldChats, chat];
      });
    });

    socket?.on("message", (message: Message) => {
      queryClient.setQueryData(
        [QUERY_KEYS.notifications],
        (oldNotifications: Set<string>) =>
          new Set([...oldNotifications, message.chat])
      );

      queryClient.setQueryData(
        [QUERY_KEYS.messages, { chatId: message.chat }],
        (oldMessages: Message[] | undefined) =>
          oldMessages ? [...oldMessages, message] : oldMessages
      );

      queryClient.setQueryData([QUERY_KEYS.chats], (oldChats: Chat[]) => {
        return oldChats.map((chat) =>
          chat._id === message.chat ? { ...chat, lastMessage: message } : chat
        );
      });
    });

    socket?.on("typing:started", (chatId: string) => {
      queryClient.setQueryData([QUERY_KEYS.chats], (oldChats: Chat[]) =>
        oldChats.map((chat) =>
          chat._id === chatId ? { ...chat, typing: true } : chat
        )
      );

      queryClient.setQueryData(
        [QUERY_KEYS.chats, { chatId }],
        (oldChat: Chat | undefined) =>
          oldChat ? { ...oldChat, typing: true } : oldChat
      );
    });

    socket?.on("typing:stopped", (chatId: string) => {
      queryClient.setQueryData(
        [QUERY_KEYS.chats, { chatId }],
        (oldChat: Chat | undefined) =>
          oldChat ? { ...oldChat, typing: false } : oldChat
      );

      queryClient.setQueryData([QUERY_KEYS.chats], (oldChats: Chat[]) =>
        oldChats.map((chat) =>
          chat._id === chatId ? { ...chat, typing: false } : chat
        )
      );
    });

    return () => {
      socket?.off("chat:new");
      socket?.off("message");
      socket?.off("typing:started");
      socket?.off("typing:stopped");
    };
  }, [authUser?._id, socket, queryClient]);
};
