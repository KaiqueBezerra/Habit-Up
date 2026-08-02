import { login } from "@/services/auth/auth-service";
import { useMutation } from "@tanstack/react-query";

type LoginData = {
  email: string;
  password: string;
};

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: LoginData) => login(email, password),
  });
}
