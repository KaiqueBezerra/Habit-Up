import { AuthService } from "@/services/auth/auth-service";
import { useMutation } from "@tanstack/react-query";

export function useDeleteAccount() {
  return useMutation({
    mutationFn: AuthService.deleteAccount,
  });
}
