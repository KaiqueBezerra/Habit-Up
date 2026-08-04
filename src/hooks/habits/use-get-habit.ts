import { useAuth } from "@/context/auth-provider";
import { getHabitById } from "@/services/habits/habits-service";
import { useQuery } from "@tanstack/react-query";

export function useGetHabit(id: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["habit", id],
    queryFn: () => getHabitById(id, user!.uid),
    enabled: !!id && !!user,
  });
}
