import { getMessages } from "@/lib/api/messages";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export const useGetMessages = (chatId: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.messages, { chatId }],
    queryFn: () => getMessages(chatId),
  });
