import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { getUser } from "@/lib/api/auth";

export const useUser = () =>
  useQuery({
    queryKey: [QUERY_KEYS.authUser],
    queryFn: getUser,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
