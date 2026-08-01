import { useAuth } from "@/context/auth-context";
import { HabitService } from "@/services/habits/habits-service";
import { Habit } from "@/services/habits/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateHabit() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  if (!user?.uid) {
    throw new Error("Usuário não autenticado.");
  }

  return useMutation({
    mutationFn: (data: Omit<Habit, "id" | "createdAt" | "updatedAt">) =>
      HabitService.create(data, user?.uid),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["habits", user?.uid],
      });
    },
  });
}
