import { useAuth } from "@/context/auth-provider";
import { queryClient } from "@/lib/react-query";
import { HabitService } from "@/services/habits/habits-service";
import { useMutation } from "@tanstack/react-query";

export function useDeleteHabit() {
  const { user } = useAuth();

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
