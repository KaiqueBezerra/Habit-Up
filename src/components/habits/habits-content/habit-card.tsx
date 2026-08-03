import { Clock3, EllipsisVertical } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { habitsDays } from "../consts";

type HabitCardProps = {
  icon: string;
  title: string;
  description?: string;
  color: string;
  reminderTime?: string;
  daysOfWeek: number[];
  onPress?: () => void;
  onMenuPress?: () => void;
};

export function HabitCard({
  icon,
  title,
  description,
  color,
  reminderTime,
  daysOfWeek,
  onPress,
  onMenuPress,
}: HabitCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="mb-4 rounded-3xl border border-zinc-800 bg-zinc-900 p-5 active:opacity-80"
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-row flex-1 items-center">
          <View
            className="mr-4 h-14 w-14 items-center justify-center rounded-2xl"
            style={{ backgroundColor: `${color}25` }}
          >
            <Text className="text-3xl">{icon}</Text>
          </View>

          <View className="flex-1">
            <Text className="text-lg font-semibold text-white">{title}</Text>

            {!!description && (
              <Text numberOfLines={2} className="mt-1 text-sm text-zinc-400">
                {description}
              </Text>
            )}
          </View>
        </View>

        <Pressable onPress={onMenuPress}>
          <EllipsisVertical color="#A1A1AA" size={20} />
        </Pressable>
      </View>

      <View className="mt-5 flex-row justify-between">
        {habitsDays.map((day, index) => {
          const selected = daysOfWeek.includes(index);

          return (
            <View
              key={index}
              className={`h-10 w-10 items-center justify-center rounded-full ${
                selected ? "" : "bg-zinc-800"
              }`}
              style={
                selected
                  ? {
                      backgroundColor: color,
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

      {!!reminderTime && (
        <View className="mt-5 flex-row items-center">
          <Clock3 color="#A1A1AA" size={18} />

          <Text className="ml-2 text-sm text-zinc-400">{reminderTime}</Text>
        </View>
      )}
    </Pressable>
  );
}
