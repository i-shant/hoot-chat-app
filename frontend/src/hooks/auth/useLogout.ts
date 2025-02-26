import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/store/store";
import { logout } from "@/lib/api/auth";
import { QUERY_KEYS } from "@/lib/constants";

export const useLogout = () => {
  const queryClient = useQueryClient();

  const disconnect = useStore((state) => state.disconnect);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      disconnect();
      queryClient.setQueryData([QUERY_KEYS.authUser], null);
      queryClient.clear();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.authUser] });
    },
  });
};
