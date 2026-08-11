import { Habit } from "@/services/habits/types";
import { Text, View } from "react-native";
import { HomeNextHabitsItem } from "./home-next-habits-item";

type HomeNextHabitProps = {
  nextHabits: Habit[];
};

export function HomeNextHabit({ nextHabits }: HomeNextHabitProps) {
  return (
    <View className="mt-8 mb-8">
      <Text className="mb-4 text-xl font-semibold text-white">
        Próximos hábitos
      </Text>

      <View className="gap-4">
        {nextHabits.map((item) => (
          <HomeNextHabitsItem
            key={item.id}
            id={item.id}
            title={item.title}
            color={item.color}
            icon={item.icon}
            reminderTime={item.reminderTime}
          />
        ))}
      </View>
    </View>
  );
}
