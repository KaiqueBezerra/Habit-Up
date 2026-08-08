import { Timestamp } from "firebase/firestore";
import { Text, View } from "react-native";

type HabitDetailsStatisticsProps = {
  streak: number | undefined;
  createdAt: Timestamp | undefined;
  successRate: number;
  totalCompletions: number;
  extraCompletions: number;
};

export function HabitDetailsStatistics({
  streak,
  createdAt,
  successRate,
  totalCompletions,
  extraCompletions,
}: HabitDetailsStatisticsProps) {
  return (
    <View className="mt-5 rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
      <Text className="text-lg font-semibold text-white">Estatísticas</Text>

      <View className="mt-4 gap-3">
        <View className="flex-row justify-between">
          <Text className="text-zinc-400">Sequência atual</Text>
          <Text className="font-semibold text-white">{streak || "0"}</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-zinc-400">Conclusões</Text>
          <Text className="font-semibold text-white">{totalCompletions}</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-zinc-400">Conclusões extras</Text>
          <Text className="font-semibold text-white">{extraCompletions}</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-zinc-400">Taxa de sucesso</Text>
          <Text className="font-semibold text-white">{successRate}%</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-zinc-400">Criado em</Text>
          <Text className="font-semibold text-white">
            {createdAt
              ? createdAt.toDate().toLocaleDateString("pt-BR")
              : "12/07/2026"}
          </Text>
        </View>
      </View>
    </View>
  );
}
