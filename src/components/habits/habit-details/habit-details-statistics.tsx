import { Text, View } from "react-native";

export function HabitDetailsStatistics() {
  return (
    <View className="mt-5 rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
      <Text className="text-lg font-semibold text-white">Estatísticas</Text>

      <View className="mt-4 gap-3">
        <View className="flex-row justify-between">
          <Text className="text-zinc-400">Sequência atual</Text>
          <Text className="font-semibold text-white">12 dias</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-zinc-400">Melhor sequência</Text>
          <Text className="font-semibold text-white">26 dias</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-zinc-400">Criado em</Text>
          <Text className="font-semibold text-white">12/07/2026</Text>
        </View>
      </View>
    </View>
  );
}
