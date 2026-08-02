import { resetPassword } from "@/services/auth/auth-service";
import { useMutation } from "@tanstack/react-query";

export function useResetPassword() {
  return useMutation({
    mutationFn: (email: string) => resetPassword(email),
  });
}
