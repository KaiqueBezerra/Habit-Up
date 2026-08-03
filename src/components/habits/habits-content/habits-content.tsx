import { Loading } from "@/components/ui/loading/loading";
import { useGetHabits } from "@/hooks/habits/use-get-habits";
import { HabitList } from "./habit-list";
import { HabitsEmpty } from "./habits-empty";

export function HabitsContent() {
  const { data: habits, isLoading } = useGetHabits();

  if (isLoading) {
    return <Loading />;
  }

  if (!habits?.length) {
    return <HabitsEmpty />;
  }

  return <HabitList habits={habits} />;
}
