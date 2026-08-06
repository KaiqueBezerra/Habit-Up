export function calculateStreak(dates: string[]) {
  if (dates.length === 0) {
    return 0;
  }

  const today = new Intl.DateTimeFormat("en-CA").format(new Date());

  const lastDate = dates[dates.length - 1];

  // Se hoje ainda não foi concluído, streak = 0
  if (lastDate !== today) {
    return 0;
  }

  let streak = 1;

  let current = new Date(lastDate);

  for (let i = dates.length - 2; i >= 0; i--) {
    current.setDate(current.getDate() - 1);

    const expected = new Intl.DateTimeFormat("en-CA").format(current);

    if (dates[i] !== expected) {
      break;
    }

    streak++;
  }

  return streak;
}
