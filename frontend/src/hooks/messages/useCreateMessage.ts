import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createMessage } from "@/lib/api/messages";
import { QUERY_KEYS } from "@/lib/constants";
import type { Chat, Message } from "@/types";

export const useCreateMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createMessage"],
    mutationFn: createMessage,

    onSettled: (data) => {
      queryClient.setQueryData([QUERY_KEYS.chats], (oldChats: Chat[]) => {
        return oldChats.map((chat) =>
          chat._id === data?.chat ? { ...chat, lastMessage: data } : chat
        );
      });

      queryClient.setQueryData(
        [QUERY_KEYS.messages, { chatId: data?.chat }],
        (oldMessages: Message[] = []) => {
          return [...oldMessages, data];
        }
      );
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    },
  });
};
