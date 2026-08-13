export function calculateStreak(dates: string[], daysOfWeek: number[]) {
  if (dates.length === 0 || daysOfWeek.length === 0) {
    return 0;
  }

  const completedDates = new Set(dates);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let current = new Date(today);

  let streak = 0;
  let hasCompletedOpportunity = false;

  while (true) {
    const dayOfWeek = current.getDay();
    const isToday = current.getTime() === today.getTime();

    // Dias que não fazem parte do planejamento são ignorados.
    if (!daysOfWeek.includes(dayOfWeek)) {
      current.setDate(current.getDate() - 1);
      continue;
    }

    const date = new Intl.DateTimeFormat("en-CA").format(current);

    // Dia planejado e concluído.
    if (completedDates.has(date)) {
      streak++;
      hasCompletedOpportunity = true;

      current.setDate(current.getDate() - 1);
      continue;
    }

    // Se é hoje e ainda não foi concluído,
    // não consideramos isso uma quebra do streak.
    if (isToday) {
      current.setDate(current.getDate() - 1);
      continue;
    }

    // Era um dia planejado que já passou sem conclusão.
    break;
  }

  return hasCompletedOpportunity ? streak : 0;
}
