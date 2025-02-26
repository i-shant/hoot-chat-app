import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { getChats } from "@/lib/api/chats";

export const useGetChats = () =>
  useQuery({
    queryKey: [QUERY_KEYS.chats],
    queryFn: getChats,
  });
