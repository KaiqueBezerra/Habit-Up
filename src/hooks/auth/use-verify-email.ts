import { verifyEmail } from "@/services/auth/auth-service";
import { useMutation } from "@tanstack/react-query";

export function useVerifyEmail() {
  return useMutation({
    mutationFn: () => verifyEmail(),
  });
}
