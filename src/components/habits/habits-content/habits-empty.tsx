import { Text, View } from "react-native";

export function HabitsEmpty() {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10">
        <Text className="text-5xl">🌱</Text>
      </View>

      <Text className="mt-6 text-center text-2xl font-bold text-white">
        Comece sua jornada
      </Text>

      <Text className="mt-3 max-w-sm text-center text-base leading-6 text-zinc-400">
        Você ainda não tem nenhum hábito. Crie o primeiro e comece a construir
        uma rotina que combina com você.
      </Text>
    </View>
  );
}
