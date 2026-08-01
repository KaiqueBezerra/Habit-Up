import { useAuth } from "@/context/auth-context";
import { HabitService } from "@/services/habits/habits-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteHabit() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  if (!user?.uid) {
    throw new Error("Usuário não autenticado.");
  }

  return useMutation({
    mutationFn: (id: string) => HabitService.delete(id, user?.uid),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["habits", user?.uid],
      });
    },
  });
}
