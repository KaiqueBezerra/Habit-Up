import { useAuth } from "@/context/auth-provider";
import { getHabits } from "@/services/habits/habits-service";
import { useQuery } from "@tanstack/react-query";

export function useGetHabits() {
  const { user } = useAuth();

  if (!user?.uid) {
    throw new Error("Usuário não autenticado.");
  }

  return useQuery({
    queryKey: ["habits", user?.uid],

    enabled: !!user,

    queryFn: () => getHabits(user?.uid),
  });
}
