import { AuthService } from "@/services/auth/auth-service";
import { useMutation } from "@tanstack/react-query";

export function useLogout() {
  return useMutation({
    mutationFn: AuthService.logout,
  });
}
