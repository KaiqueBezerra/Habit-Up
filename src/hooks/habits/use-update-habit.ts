import { useAuth } from "@/context/auth-provider";
import { queryClient } from "@/lib/react-query";
import { updateHabit } from "@/services/habits/habits-service";
import { Habit } from "@/services/habits/types";
import { useMutation } from "@tanstack/react-query";

export function useUpdateHabit(id: string) {
  const { user } = useAuth();

  return useMutation({
    mutationFn: (data: Omit<Habit, "id" | "createdAt" | "updatedAt">) =>
      updateHabit(id, data, user!.uid),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["habits"],
      });

      queryClient.invalidateQueries({
        queryKey: ["habit", id],
      });
    },
  });
}
