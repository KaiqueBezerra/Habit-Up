import { useAuth } from "@/context/auth-provider";
import { queryClient } from "@/lib/react-query";
import { createHabit } from "@/services/habits/habits-service";
import { Habit } from "@/services/habits/types";
import { useMutation } from "@tanstack/react-query";

export function useCreateHabit() {
  const { user } = useAuth();

  return useMutation({
    mutationFn: (data: Omit<Habit, "id" | "createdAt" | "updatedAt">) =>
      createHabit(data, user!.uid),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["habits", user?.uid],
      });
    },
  });
}
