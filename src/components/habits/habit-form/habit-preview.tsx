import { Text, View } from "react-native";

export function HabitPreview({ icon, title, description, color }: any) {
  return (
    <View className="flex-row items-center">
      <View
        className="mr-4 h-14 w-14 items-center justify-center rounded-2xl"
        style={{ backgroundColor: `${color}25` }}
      >
        <Text className="text-2xl">{icon || "🌱"}</Text>
      </View>

      <View className="flex-1">
        <Text className="text-lg font-semibold text-white">
          {title || "Novo hábito"}
        </Text>

        <Text className="text-sm text-zinc-400">
          {description || "Sem descrição"}
        </Text>
      </View>
    </View>
  );
}
