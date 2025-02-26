import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { getNotifications } from "@/lib/api/notifications";

export const useGetNotifications = () =>
  useQuery({
    queryKey: [QUERY_KEYS.notifications],
    queryFn: getNotifications,
  });
