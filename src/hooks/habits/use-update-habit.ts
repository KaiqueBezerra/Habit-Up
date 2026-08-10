import { useAuth } from "@/context/auth-provider";
import { appToast } from "@/helpers/toast";
import { queryClient } from "@/lib/react-query";
import { updateHabit } from "@/services/habits/habits-service";
import { HabitRequest } from "@/services/habits/types";
import { useMutation } from "@tanstack/react-query";

export function useUpdateHabit(id: string) {
  const { user } = useAuth();

  return useMutation({
    mutationFn: (data: HabitRequest) => updateHabit(id, data, user!.uid),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["habits"],
      });

      queryClient.invalidateQueries({
        queryKey: ["habit", id],
      });

      appToast.success("Hábito atualizado com sucesso!");
    },

    onError() {
      appToast.error("Não foi possível atualizar o hábito.");
    },
  });
}
