import { Text, View } from "react-native";

export function HabitsHeader() {
  return (
    <View className="mt-10">
      <Text className="text-3xl font-bold text-white">Meus Hábitos</Text>

      <Text className="mt-2 text-base text-zinc-400">
        Crie hábitos saudáveis e acompanhe sua evolução.
      </Text>
    </View>
  );
}
