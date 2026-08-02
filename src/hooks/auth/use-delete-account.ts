import { deleteAccount } from "@/services/auth/auth-service";
import { useMutation } from "@tanstack/react-query";

export function useDeleteAccount() {
  return useMutation({
    mutationFn: () => deleteAccount(),
  });
}
