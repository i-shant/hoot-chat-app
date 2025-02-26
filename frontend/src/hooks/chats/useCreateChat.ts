import type { Chat } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { createChat } from "@/lib/api/chats";
import { QUERY_KEYS } from "@/lib/constants";

export const useCreateChat = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  return useMutation({
    mutationFn: createChat,
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEYS.chats], (oldChats: Chat[] = []) => [
        ...oldChats,
        data,
      ]);

      navigate(`/chat/${data._id}`);
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
