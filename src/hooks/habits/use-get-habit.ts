import { useAuth } from "@/context/auth-provider";
import { getHabitById } from "@/services/habits/habits-service";
import { useQuery } from "@tanstack/react-query";

export function useGetHabit(habitId: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["habit", habitId],
    queryFn: () => getHabitById(habitId, user!.uid),
    enabled: !!habitId && !!user,
  });
}
