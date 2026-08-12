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

    // Se hoje ainda não terminou, não consideramos
    // a ausência de conclusão como quebra.
    const isToday = current.getTime() === today.getTime();

    if (daysOfWeek.includes(dayOfWeek)) {
      const date = new Intl.DateTimeFormat("en-CA").format(current);

      if (completedDates.has(date)) {
        streak++;
        hasCompletedOpportunity = true;
      } else if (isToday) {
        // Hoje ainda está em andamento.
        break;
      } else {
        // Era um dia planejado e já passou sem conclusão.
        break;
      }
    }

    // Volta um dia.
    current.setDate(current.getDate() - 1);

    // Evita procurar indefinidamente no passado.
    if (current < new Date("2000-01-01")) {
      break;
    }
  }

  return hasCompletedOpportunity ? streak : 0;
}
