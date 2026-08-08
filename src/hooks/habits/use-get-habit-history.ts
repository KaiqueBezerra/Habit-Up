import { useAuth } from "@/context/auth-provider";
import { getHabitHistory } from "@/services/habits/history-service";
import { useQuery } from "@tanstack/react-query";

export function useGetHabitHistory(habitId: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["habit-history", habitId],
    queryFn: () => getHabitHistory(user!.uid, habitId),
    enabled: !!user?.uid && !!habitId,
  });
}
