import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";

import { useAuth } from "@/context/auth-provider";
import { AuthService } from "@/services/auth/auth-service";

export function useUpdateProfile() {
  const { reloadUser } = useAuth();

  return useMutation<void, FirebaseError, string>({
    mutationFn: AuthService.updateProfile,

    onSuccess: async () => {
      await reloadUser();
    },
  });
}
