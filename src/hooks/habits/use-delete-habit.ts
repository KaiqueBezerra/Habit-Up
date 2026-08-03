import { useAuth } from "@/context/auth-provider";
import { queryClient } from "@/lib/react-query";
import { deleteHabit } from "@/services/habits/habits-service";
import { useMutation } from "@tanstack/react-query";

export function useDeleteHabit() {
  const { user } = useAuth();

  return useMutation({
    mutationFn: (id: string) => deleteHabit(id, user!.uid),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["habits", user?.uid],
      });
    },
  });
}
