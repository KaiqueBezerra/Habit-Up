import { Text, View } from "react-native";

export function HabitPreview({ icon, title, description }: any) {
  return (
    <View className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
      <View className="flex-row items-center">
        <Text className="text-3xl">{icon || "🌱"}</Text>

        <View className="ml-4 flex-1">
          <Text className="text-lg font-semibold text-white">
            {title || "Novo hábito"}
          </Text>

          <Text className="text-sm text-zinc-400">
            {description || "Sem descrição"}
          </Text>
        </View>
      </View>
    </View>
  );
}
