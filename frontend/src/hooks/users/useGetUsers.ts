import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { getUsers } from "@/lib/api/users";

export const useGetUsers = (q?: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.users],
    queryFn: () => getUsers(q),
  });
