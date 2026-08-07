import {
    Award,
    CalendarDays,
    CheckCircle2,
    Flame,
    Target,
    TrendingUp,
} from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";

export function StatisticsComponent() {
  return (
    <ScrollView
      className="flex-1 bg-zinc-950 px-6 pt-16"
      contentContainerClassName="pb-10"
    >
      <View>
        <Text className="text-4xl font-bold text-white">Estatísticas</Text>

        <Text className="mt-2 text-base text-zinc-400">
          Acompanhe sua evolução ao longo do tempo.
        </Text>
      </View>

      {/* Destaque */}
      <View className="mt-8 rounded-3xl bg-emerald-500 p-6">
        <View className="flex-row items-center">
          <Flame color="white" size={26} />

          <Text className="ml-3 text-lg font-semibold text-white">
            Sequência atual
          </Text>
        </View>

        <Text className="mt-3 text-5xl font-bold text-white">12 dias</Text>

        <Text className="mt-2 text-emerald-100">
          Continue assim para manter sua rotina.
        </Text>
      </View>

      {/* Cards */}
      <View className="mt-6 flex-row justify-between">
        <View className="w-[48%] rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
          <CheckCircle2 color="#22C55E" size={22} />

          <Text className="mt-4 text-3xl font-bold text-white">86</Text>

          <Text className="mt-1 text-zinc-400">Conclusões</Text>
        </View>

        <View className="w-[48%] rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
          <Target color="#3B82F6" size={22} />

          <Text className="mt-4 text-3xl font-bold text-white">8</Text>

          <Text className="mt-1 text-zinc-400">Hábitos ativos</Text>
        </View>
      </View>

      <View className="mt-4 flex-row justify-between">
        <View className="w-[48%] rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
          <Award color="#EAB308" size={22} />

          <Text className="mt-4 text-3xl font-bold text-white">18</Text>

          <Text className="mt-1 text-zinc-400">Melhor sequência</Text>
        </View>

        <View className="w-[48%] rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
          <TrendingUp color="#A855F7" size={22} />

          <Text className="mt-4 text-3xl font-bold text-white">78%</Text>

          <Text className="mt-1 text-zinc-400">Taxa de sucesso</Text>
        </View>
      </View>

      {/* Resumo */}
      <View className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-5 mb-8">
        <View className="flex-row items-center">
          <CalendarDays color="#10B981" size={20} />

          <Text className="ml-2 text-lg font-semibold text-white">Resumo</Text>
        </View>

        <View className="mt-5 gap-5">
          <View className="flex-row justify-between">
            <Text className="text-zinc-400">Hábitos criados</Text>

            <Text className="font-semibold text-white">10</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-zinc-400">Hábitos concluídos</Text>

            <Text className="font-semibold text-white">86</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-zinc-400">Sequência atual</Text>

            <Text className="font-semibold text-white">12 dias</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-zinc-400">Melhor sequência</Text>

            <Text className="font-semibold text-white">18 dias</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-zinc-400">Taxa de sucesso</Text>

            <Text className="font-semibold text-white">78%</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
