import { register } from "@/services/auth/auth-service";
import { useMutation } from "@tanstack/react-query";

type RegisterData = {
  email: string;
  password: string;
  name: string;
};

export function useRegister() {
  return useMutation({
    mutationFn: async ({ email, password, name }: RegisterData) => {
      await register(email, password, name);
    },
  });
}
