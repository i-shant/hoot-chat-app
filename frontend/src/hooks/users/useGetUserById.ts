import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { getUserById } from "@/lib/api/users";

export const useGetUserById = (userId: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.users, { userId }],
    queryFn: () => getUserById(userId),
  });
