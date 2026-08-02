import { useAuth } from "@/context/auth-provider";
import { queryClient } from "@/lib/react-query";
import { HabitService } from "@/services/habits/habits-service";
import { Habit } from "@/services/habits/types";
import { useMutation } from "@tanstack/react-query";

export function useCreateHabit() {
  const { user } = useAuth();

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
