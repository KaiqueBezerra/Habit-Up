import { Text, View } from "react-native";

export function HabitsContent() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="mt-6 text-2xl font-bold text-white">
        Nenhum hábito encontrado
      </Text>

      <Text className="mt-3 text-center text-base text-zinc-400">
        Crie seu primeiro hábito e comece a construir uma rotina mais saudável.
      </Text>
    </View>
  );
}
