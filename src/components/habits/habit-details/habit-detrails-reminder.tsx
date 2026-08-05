import { Bell } from "lucide-react-native";
import { Text, View } from "react-native";

type HabitDetailsReminderProps = {
  reminderTime: string;
};

export function HabitDetailsReminder({
  reminderTime,
}: HabitDetailsReminderProps) {
  return (
    <View className="mt-5 rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
      <View className="flex-row items-center">
        <Bell color="#10B981" size={20} />

        <Text className="ml-2 text-lg font-semibold text-white">Lembrete</Text>
      </View>

      <Text className="mt-3 text-base text-zinc-300">{reminderTime}</Text>
    </View>
  );
}
