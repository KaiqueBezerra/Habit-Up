import { useAuth } from "@/context/auth-provider";
import { isHabitCompleted } from "@/services/habits/history-service";
import { useQuery } from "@tanstack/react-query";

export function useGetTodayCompletion(habitId: string) {
  const { user } = useAuth();

  const today = new Intl.DateTimeFormat("en-CA").format(new Date());

  return useQuery({
    queryKey: ["habit-completion", habitId, today],
    queryFn: () => isHabitCompleted(habitId, user!.uid, today),
    enabled: !!habitId && !!user,
  });
}
