import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { habitExamples } from "../habits/consts";

export function HomeEmpty() {
  return (
    <View className="flex-1 items-center justify-center bg-zinc-950 px-6 pt-16">
      <View className="w-full rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <View className="items-center">
          <Text className="text-center text-2xl font-bold text-white">
            Bem-vindo ao Habit Up
          </Text>

          <Text className="mt-3 text-center text-base leading-6 text-zinc-400">
            Você ainda não criou nenhum hábito.
            {"\n"}
            Comece adicionando o primeiro para acompanhar sua evolução diária.
          </Text>

          <Pressable
            onPress={() => router.push("/(screens)/create-habit")}
            className="mt-8 w-full rounded-2xl bg-emerald-500 py-4 active:opacity-80"
          >
            <Text className="text-center text-lg font-semibold text-white">
              Criar primeiro hábito
            </Text>
          </Pressable>
        </View>

        <View className="mt-8 border-t border-zinc-800 pt-6">
          <Text className="mb-5 text-lg font-semibold text-white">
            Exemplos de hábitos
          </Text>

          <View className="gap-4">
            {habitExamples.map((habit) => (
              <View
                key={habit.title}
                className="flex-row items-center rounded-2xl bg-zinc-800 p-4"
              >
                <View className="mr-4 h-12 w-12 items-center justify-center rounded-xl bg-zinc-700">
                  <Text className="text-2xl">{habit.icon}</Text>
                </View>

                <View className="flex-1">
                  <Text className="text-base font-semibold text-white">
                    {habit.title}
                  </Text>

                  <Text className="mt-1 text-sm text-zinc-400">
                    {habit.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
