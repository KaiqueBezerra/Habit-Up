export function calculateHabitSuccessRate(
  createdAt: Date,
  daysOfWeek: number[],
  completedDates: string[],
) {
  const today = new Date();

  const start = new Date(
    createdAt.getFullYear(),
    createdAt.getMonth(),
    createdAt.getDate(),
  );

  const end = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  let opportunities = 0;
  let plannedCompletions = 0;
  let extraCompletions = 0;

  const completedSet = new Set(completedDates);

  const current = new Date(start);

  while (current <= end) {
    const date = new Intl.DateTimeFormat("en-CA").format(current);
    const dayOfWeek = current.getDay();

    const isPlanned = daysOfWeek.includes(dayOfWeek);
    const isCompleted = completedSet.has(date);

    if (isPlanned) {
      opportunities++;

      if (isCompleted) {
        plannedCompletions++;
      }
    } else if (isCompleted) {
      extraCompletions++;
    }

    current.setDate(current.getDate() + 1);
  }

  const successRate =
    opportunities === 0
      ? 0
      : Math.round((plannedCompletions / opportunities) * 100);

  return {
    successRate,
    opportunities,
    plannedCompletions,
    extraCompletions,
  };
}
