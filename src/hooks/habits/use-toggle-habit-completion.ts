import { useAuth } from "@/context/auth-provider";
import { queryClient } from "@/lib/react-query";
import {
  completeHabit,
  isHabitCompleted,
  uncompleteHabit,
} from "@/services/habits/history-service";
import { useMutation } from "@tanstack/react-query";

export function useToggleHabitCompletion(habitId: string) {
  const { user } = useAuth();

  return useMutation({
    mutationFn: async () => {
      if (!user) {
        throw new Error("Usuário não autenticado.");
      }

      const today = new Intl.DateTimeFormat("en-CA").format(new Date());

      const completion = await isHabitCompleted(habitId, user.uid, today);

      if (completion) {
        await uncompleteHabit(user.uid, habitId, today);

        return {
          completed: false,
        };
      }

      await completeHabit(user.uid, habitId);

      return {
        completed: true,
      };
    },

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["habits", user?.uid],
      });

      queryClient.invalidateQueries({
        queryKey: ["habit", habitId],
      });

      queryClient.invalidateQueries({
        queryKey: ["habit-completion", habitId],
      });

      queryClient.invalidateQueries({
        queryKey: ["today-completed-habits", user?.uid],
      });
    },
  });
}
