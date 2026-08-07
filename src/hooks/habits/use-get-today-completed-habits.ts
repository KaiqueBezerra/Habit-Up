import { useAuth } from "@/context/auth-provider";
import { getTodayCompletedHabits } from "@/services/habits/history-service";
import { useQuery } from "@tanstack/react-query";

export function useGetTodayCompletedHabits() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["today-completed-habits", user?.uid],

    enabled: !!user,

    queryFn: () => getTodayCompletedHabits(user!.uid),
  });
}
