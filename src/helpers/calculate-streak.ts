export function calculateStreak(dates: string[]) {
  if (dates.length === 0) {
    return 0;
  }

  const sortedDates = [...new Set(dates)].sort();

  const today = new Intl.DateTimeFormat("en-CA").format(new Date());

  const yesterdayDate = new Date(`${today}T00:00:00Z`);
  yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1);

  const yesterday = yesterdayDate.toISOString().slice(0, 10);

  const lastDate = sortedDates[sortedDates.length - 1];

  // Se a última conclusão não foi hoje nem ontem,
  // a sequência já foi quebrada.
  if (lastDate !== today && lastDate !== yesterday) {
    return 0;
  }

  let streak = 1;

  const current = new Date(`${lastDate}T00:00:00Z`);

  for (let i = sortedDates.length - 2; i >= 0; i--) {
    current.setUTCDate(current.getUTCDate() - 1);

    const expected = current.toISOString().slice(0, 10);

    if (sortedDates[i] !== expected) {
      break;
    }

    streak++;
  }

  return streak;
}
