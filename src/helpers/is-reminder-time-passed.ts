export function isReminderTimePassed(reminderTime?: string) {
  if (!reminderTime) {
    return false;
  }

  const [hours, minutes] = reminderTime.split(":").map(Number);

  const now = new Date();

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const reminderMinutes = hours * 60 + minutes;

  return reminderMinutes < currentMinutes;
}
