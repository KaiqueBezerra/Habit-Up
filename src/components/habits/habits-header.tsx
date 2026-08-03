import { useGetHabits } from "@/hooks/habits/use-get-habits";
import { Text, View } from "react-native";

export function HabitsHeader() {
  const { data: habits } = useGetHabits();

  return (
    <View className="mt-10">
      <Text className="text-3xl font-bold text-white">Meus hábitos</Text>

      <Text className="mt-2 mb-6 text-zinc-400">
        {habits?.length || 0}{" "}
        {habits?.length === 1 ? "hábito cadastrado" : "hábitos cadastrados"}
      </Text>
    </View>
  );
}
