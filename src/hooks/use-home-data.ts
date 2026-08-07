import { useMemo } from "react";

import { useGetHabits } from "@/hooks/habits/use-get-habits";

import { getCurrentDayOfWeek } from "@/helpers/get-current-day-of-week";
import { useGetTodayCompletedHabits } from "./habits/use-get-today-completed-habits";

export function useHomeData() {
  const habitsQuery = useGetHabits();

  const completedQuery = useGetTodayCompletedHabits();

  const habits = habitsQuery.data ?? [];

  const completedIds = completedQuery.data ?? [];

  const data = useMemo(() => {
    const currentDay = getCurrentDayOfWeek();

    const todayHabits = habits.filter((habit) =>
      habit.daysOfWeek.includes(currentDay),
    );

    const completedTodayHabits = todayHabits.filter((habit) =>
      completedIds.includes(habit.id),
    );

    const pendingTodayHabits = todayHabits.filter(
      (habit) => !completedIds.includes(habit.id),
    );

    const totalToday = todayHabits.length;

    const completionPercentage =
      totalToday === 0
        ? 0
        : Math.round((completedTodayHabits.length / totalToday) * 100);

    return {
      todayHabits,

      nextHabits: pendingTodayHabits.sort((a, b) =>
        (a.reminderTime ?? "").localeCompare(b.reminderTime ?? ""),
      ),

      completedToday: completedTodayHabits.length,

      pendingToday: pendingTodayHabits.length,

      totalToday,

      completionPercentage,

      currentStreak: Math.max(0, ...habits.map((h) => h.streak)),

      totalCompletions: habits.reduce(
        (acc, habit) => acc + habit.totalCompletions,
        0,
      ),

      totalHabits: habits.length,
    };
  }, [habits, completedIds]);

  return {
    isLoading: habitsQuery.isLoading || completedQuery.isLoading,
    isError: habitsQuery.isError || completedQuery.isError,
    data,
  };
}
