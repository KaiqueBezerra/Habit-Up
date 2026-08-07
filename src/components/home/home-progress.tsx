import { Text, View } from "react-native";

type HomeProgressProps = {
  completedToday: number;
  totalToday: number;
};

export function HomeProgress({
  completedToday,
  totalToday,
}: HomeProgressProps) {
  const completedPercentage = (completedToday / totalToday) * 100;

  return (
    <View
      className={`mt-8 rounded-3xl p-6 ${
        completedPercentage <= 33.34
          ? "bg-red-500"
          : completedPercentage <= 66.67
            ? "bg-amber-500"
            : "bg-emerald-500"
      }`}
    >
      <Text className="text-lg font-semibold text-white">
        Progresso de hoje
      </Text>

      <Text className="mt-2 text-5xl font-bold text-white">
        {completedToday}/{totalToday}
      </Text>

      <Text className="mt-1 text-emerald-100">
        {completedPercentage == 0
          ? "Você ainda não concluiu nenhum hábito hoje."
          : `Você concluiu ${completedPercentage.toFixed(2)}% dos hábitos de hoje.`}
      </Text>
    </View>
  );
}
