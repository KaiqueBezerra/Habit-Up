import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Target,
} from "lucide-react-native";
import { Text, View } from "react-native";

type HomeSummaryProps = {
  totalToday: number;
  completedToday: number;
  pendingToday: number;
};

export function HomeSummary({
  totalToday,
  completedToday,
  pendingToday,
}: HomeSummaryProps) {
  return (
    <View className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
      <View className="flex-row items-center">
        <CalendarDays color="#10B981" size={20} />

        <Text className="ml-2 text-lg font-semibold text-white">
          Resumo de hoje
        </Text>
      </View>

      <View className="mt-5 gap-4">
        <View className="flex-row justify-between">
          <View className="flex-row items-center">
            <Target color="#A1A1AA" size={18} />
            <Text className="ml-2 text-zinc-300">Hábitos previstos</Text>
          </View>

          <Text className="font-semibold text-white">{totalToday}</Text>
        </View>

        <View className="flex-row justify-between">
          <View className="flex-row items-center">
            <CheckCircle2 color="#22C55E" size={18} />
            <Text className="ml-2 text-zinc-300">Concluídos</Text>
          </View>

          <Text className="font-semibold text-white">{completedToday}</Text>
        </View>

        <View className="flex-row justify-between">
          <View className="flex-row items-center">
            <Clock3 color="#F97316" size={18} />
            <Text className="ml-2 text-zinc-300">Pendentes</Text>
          </View>

          <Text className="font-semibold text-white">{pendingToday}</Text>
        </View>
      </View>
    </View>
  );
}
