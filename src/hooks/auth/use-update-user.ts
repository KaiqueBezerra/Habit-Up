import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";

import { useAuth } from "@/context/auth-provider";
import { updateUserProfile } from "@/services/auth/auth-service";

export function useUpdateProfile() {
  const { reloadUser } = useAuth();

  return useMutation<void, FirebaseError, string>({
    mutationFn: (displayName: string) => updateUserProfile(displayName),

    onSuccess: async () => {
      await reloadUser();
    },
  });
}
