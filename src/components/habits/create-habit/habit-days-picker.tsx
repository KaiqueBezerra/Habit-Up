import { ShowError } from "@/components/ui/show-error/show-error";
import { Controller } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { habitsDays } from "./consts";

export function HabitDaysPicker({ control, errors }: any) {
  return (
    <View>
      <Text className="mb-2 text-sm font-medium text-zinc-300">
        Dias da Semana <Text className="text-red-500">*</Text>
      </Text>

      <Text className="mb-4 text-xs text-zinc-500">
        Selecione os dias em que deseja realizar este hábito.
      </Text>

      <Controller
        control={control}
        name="daysOfWeek"
        render={({ field }) => (
          <View className="flex-row justify-between">
            {habitsDays.map((day, index) => {
              const selected = field.value.includes(index);

              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    if (selected) {
                      field.onChange(
                        field.value.filter((d: number) => d !== index),
                      );
                    } else {
                      field.onChange([...field.value, index]);
                    }
                  }}
                  className={`h-12 w-12 items-center justify-center rounded-full ${
                    selected ? "bg-emerald-500" : "bg-zinc-900"
                  }`}
                >
                  <Text
                    className={`font-semibold ${
                      selected ? "text-white" : "text-zinc-400"
                    }`}
                  >
                    {day}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}
      />

      <ShowError error={errors.daysOfWeek} />
    </View>
  );
}
