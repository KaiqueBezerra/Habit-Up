import { ShowError } from "@/components/ui/show-error/show-error";
import { Controller } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";

export function HabitGoalSection({ control, errors, goalType }: any) {
  return (
    <View>
      <Text className="mb-3 text-sm font-medium text-zinc-300">
        Tipo da meta
      </Text>

      <Controller
        control={control}
        name="goalType"
        render={({ field }) => (
          <View className="flex-row gap-3">
            <Pressable
              onPress={() => field.onChange("boolean")}
              className={`flex-1 rounded-2xl border p-4 ${
                field.value === "boolean"
                  ? "border-emerald-500 bg-emerald-500/20"
                  : "border-zinc-800 bg-zinc-900"
              }`}
            >
              <Text className="text-center text-white">Apenas concluir</Text>
            </Pressable>

            <Pressable
              onPress={() => field.onChange("number")}
              className={`flex-1 rounded-2xl border p-4 ${
                field.value === "number"
                  ? "border-emerald-500 bg-emerald-500/20"
                  : "border-zinc-800 bg-zinc-900"
              }`}
            >
              <Text className="text-center text-white">Meta numérica</Text>
            </Pressable>
          </View>
        )}
      />

      {goalType === "number" && (
        <>
          <View className="mt-5">
            <Text className="mb-2 text-sm font-medium text-zinc-300">Meta</Text>

            <Controller
              control={control}
              name="goalValue"
              render={({ field }) => (
                <TextInput
                  value={field.value ?? ""}
                  onChangeText={field.onChange}
                  keyboardType="numeric"
                  placeholder="Ex: 2000"
                  placeholderTextColor="#71717a"
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-base text-white"
                />
              )}
            />

            <ShowError error={errors.goalValue} />
          </View>

          <View className="mt-5">
            <Text className="mb-2 text-sm font-medium text-zinc-300">
              Unidade
            </Text>

            <Controller
              control={control}
              name="goalUnit"
              render={({ field }) => (
                <TextInput
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="ml, minutos, páginas..."
                  placeholderTextColor="#71717a"
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-base text-white"
                />
              )}
            />

            <ShowError error={errors.goalUnit} />
          </View>
        </>
      )}
    </View>
  );
}
