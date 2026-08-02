import { AuthService } from "@/services/auth/auth-service";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "firebase/auth";

type RegisterData = {
  email: string;
  password: string;
  name: string;
};

export function useRegister() {
  return useMutation({
    mutationFn: async ({ email, password, name }: RegisterData) => {
      const { user } = await AuthService.register(email, password);

      await updateProfile(user, {
        displayName: name,
      });
    },
  });
}
