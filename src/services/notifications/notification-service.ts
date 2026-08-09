import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermission() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("habit-reminders", {
      name: "Lembretes de hábitos",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250],
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  if (existingStatus === Notifications.PermissionStatus.GRANTED) {
    return true;
  }

  const { status } = await Notifications.requestPermissionsAsync();

  return status === Notifications.PermissionStatus.GRANTED;
}

type ScheduleHabitNotificationsParams = {
  habitId: string;
  title: string;
  icon: string;
  reminderTime?: string;
  daysOfWeek: number[];
};

export async function scheduleHabitNotifications({
  habitId,
  title,
  icon,
  reminderTime,
  daysOfWeek,
}: ScheduleHabitNotificationsParams) {
  if (!reminderTime || daysOfWeek.length === 0) {
    return [];
  }

  const hasPermission = await requestNotificationPermission();

  if (!hasPermission) {
    throw new Error("Permissão para notificações não concedida.");
  }

  const [hours, minutes] = reminderTime.split(":").map(Number);

  const notificationIds: string[] = [];

  for (const day of daysOfWeek) {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: `${icon} Hora do hábito!`,
        body: title,
        data: {
          habitId,
          type: "habit-reminder",
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
        weekday: day + 1,
        hour: hours,
        minute: minutes,
        channelId: "habit-reminders",
      },
    });

    notificationIds.push(notificationId);
  }

  return notificationIds;
}

export async function cancelHabitNotifications(habitId: string) {
  const notifications = await Notifications.getAllScheduledNotificationsAsync();

  const habitNotifications = notifications.filter(
    (notification) => notification.content.data?.habitId === habitId,
  );

  await Promise.all(
    habitNotifications.map((notification) =>
      Notifications.cancelScheduledNotificationAsync(notification.identifier),
    ),
  );
}

export async function rescheduleHabitNotifications(
  params: ScheduleHabitNotificationsParams,
) {
  await cancelHabitNotifications(params.habitId);

  return scheduleHabitNotifications(params);
}
