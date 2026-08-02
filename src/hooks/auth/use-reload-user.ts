import { useAuth } from "@/context/auth-provider";
import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";

export function useReloadUser() {
  const { reloadUser } = useAuth();

  return useMutation<void, FirebaseError>({
    mutationFn: reloadUser,
  });
}
