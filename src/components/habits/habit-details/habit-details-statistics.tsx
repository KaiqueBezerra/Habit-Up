import { Timestamp } from "firebase/firestore";
import { Text, View } from "react-native";

type HabitDetailsStatisticsProps = {
  streak: number | undefined;
  createdAt: Timestamp | undefined;
};

export function HabitDetailsStatistics({
  streak,
  createdAt,
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
          <Text className="text-zinc-400">Melhor sequência</Text>
          <Text className="font-semibold text-white">26 dias</Text>
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
