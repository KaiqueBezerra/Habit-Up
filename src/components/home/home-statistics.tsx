import { Award, LucideFlameKindling } from "lucide-react-native";
import { Text, View } from "react-native";

type HomeStatisticsProps = {
  currentStreak: number;
  totalCompletions: number;
};

export function HomeStatistics({
  currentStreak,
  totalCompletions,
}: HomeStatisticsProps) {
  return (
    <View className="mt-6 flex-row justify-between">
      <View className="w-[48%] rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
        <LucideFlameKindling color="#f97316" size={24} />

        <Text className="mt-4 text-3xl font-bold text-white">
          {currentStreak}
        </Text>

        <Text className="mt-1 text-zinc-400">Sequência atual</Text>
      </View>

      <View className="w-[48%] rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
        <Award color="#facc15" size={24} />

        <Text className="mt-4 text-3xl font-bold text-white">
          {totalCompletions}
        </Text>

        <Text className="mt-1 text-zinc-400">Conclusões</Text>
      </View>
    </View>
  );
}
