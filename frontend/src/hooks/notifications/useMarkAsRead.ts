import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { markAsRead } from "@/lib/api/notifications";
import { QUERY_KEYS } from "@/lib/constants";

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["markAsRead"],
    mutationFn: markAsRead,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.notifications] });
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
