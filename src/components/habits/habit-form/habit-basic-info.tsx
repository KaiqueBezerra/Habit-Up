import { ShowError } from "@/components/ui/show-error/show-error";
import { Controller } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

export function HabitBasicInfo({ control, errors }: any) {
  return (
    <View className="gap-5">
      <View>
        <Text className="mb-2 text-sm font-medium text-zinc-300">
          Título <Text className="text-red-500">*</Text>
        </Text>

        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Digite o título do hábito"
              placeholderTextColor="#71717a"
              maxLength={30}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-base text-white"
            />
          )}
        />

        <ShowError error={errors.title} />
      </View>

      <View>
        <Text className="mb-2 text-sm font-medium text-zinc-300">
          Descrição
        </Text>

        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Digite a descrição do hábito"
              placeholderTextColor="#71717a"
              maxLength={150}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-base text-white"
            />
          )}
        />

        <ShowError error={errors.description} />
      </View>
    </View>
  );
}
