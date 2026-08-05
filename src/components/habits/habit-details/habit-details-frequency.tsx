import { CalendarDays } from "lucide-react-native";
import { Text, View } from "react-native";
import { habitsDays } from "../consts";

type HabitDetailsFrequencyProps = {
  daysOfWeek: number[];
  color: string | undefined;
};

export function HabitDetailsFrequency({
  daysOfWeek,
  color,
}: HabitDetailsFrequencyProps) {
  return (
    <View className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
      <View className="mb-4 flex-row items-center">
        <CalendarDays color="#10B981" size={20} />

        <Text className="ml-2 text-lg font-semibold text-white">
          Frequência
        </Text>
      </View>

      <View className="flex-row justify-between">
        {habitsDays.map((day, index) => {
          const selected = daysOfWeek.includes(index);

          return (
            <View
              key={index}
              className={`h-11 w-11 items-center justify-center rounded-full ${
                selected ? "" : "bg-zinc-800"
              }`}
              style={
                selected
                  ? {
                      backgroundColor: color ?? "#10B981",
                    }
                  : undefined
              }
            >
              <Text
                className={`font-semibold ${
                  selected ? "text-white" : "text-zinc-500"
                }`}
              >
                {day}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
