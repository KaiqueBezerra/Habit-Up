import { useAuth } from "@/context/auth-provider";
import { syncAllHabitsStatistics } from "@/services/habits/history-service";
import { useMutation } from "@tanstack/react-query";

export function useSyncHabitsStatistics() {
  const { user } = useAuth();

  return useMutation({
    mutationFn: () => {
      if (!user?.uid) {
        throw new Error("Usuário não autenticado.");
      }

      return syncAllHabitsStatistics(user.uid);
    },
  });
}
