import { isReminderTimePassed } from "@/helpers/is-reminder-time-passed";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

type HomeNextHabitsItemProps = {
  id: string;
  title: string;
  color: string;
  icon: string;
  reminderTime?: string | undefined;
};

export function HomeNextHabitsItem({
  id,
  title,
  color,
  icon,
  reminderTime,
}: HomeNextHabitsItemProps) {
  const reminderPassed = isReminderTimePassed(reminderTime);

  return (
    <Pressable
      className="rounded-3xl border border-zinc-800 
    bg-zinc-900 p-5 active:opacity-80"
      onPress={() =>
        router.push({
          pathname: "/(screens)/habit-details",
          params: {
            id: id,
          },
        })
      }
    >
      <View className="flex-row items-center">
        <View
          className="mr-4 h-14 w-14 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${color}25` }}
        >
          <Text className="text-3xl">{icon}</Text>
        </View>

        <View className="flex-1">
          <Text className="text-lg font-semibold text-white">{title}</Text>

          {reminderTime && (
            <Text className={reminderPassed ? "text-red-500" : "text-zinc-400"}>
              {reminderTime}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}
