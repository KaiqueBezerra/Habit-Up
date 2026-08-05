import { Target } from "lucide-react-native";
import { Text, View } from "react-native";

type HabitDetailsGoalProps = {
  goalType: "number" | "boolean" | undefined;
  goalValue?: number;
  goalUnit?: string;
};

export function HabitDetailsGoal({
  goalType,
  goalValue,
  goalUnit,
}: HabitDetailsGoalProps) {
  return (
    <View className="mt-5 rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
      <View className="flex-row items-center">
        <Target color="#10B981" size={20} />

        <Text className="ml-2 text-lg font-semibold text-white">Meta</Text>
      </View>

      {goalType === "boolean" ? (
        <View className="mt-4 rounded-2xl bg-zinc-800 p-4">
          <Text className="text-center text-base font-medium text-white">
            ✓ Concluir diariamente
          </Text>
        </View>
      ) : (
        <View className="mt-4 rounded-2xl bg-zinc-800 p-4">
          <Text className="text-center text-3xl font-bold text-emerald-400">
            {goalValue}
          </Text>

          <Text className="mt-1 text-center text-zinc-400">{goalUnit}</Text>
        </View>
      )}
    </View>
  );
}
