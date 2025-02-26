import { useQuery } from "@tanstack/react-query";
import { getChatById } from "@/lib/api/chats";
import { QUERY_KEYS } from "@/lib/constants";

export const useGetChatById = (chatId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.chats, { chatId }],
    queryFn: () => getChatById(chatId),
  });
};
