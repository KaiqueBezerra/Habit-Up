import { ShowError } from "@/components/ui/show-error/show-error";
import { Controller } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { habitIcons } from "../consts";

export function HabitIconPicker({ control, errors }: any) {
  return (
    <View>
      <Text className="mb-2 text-sm font-medium text-zinc-300">
        Ícone <Text className="text-red-500">*</Text>
      </Text>

      <Controller
        control={control}
        name="icon"
        render={({ field }) => (
          <View className="flex-row flex-wrap gap-3">
            {habitIcons.map((icon) => (
              <Pressable
                key={icon}
                onPress={() => field.onChange(icon)}
                className={`h-14 w-14 items-center justify-center rounded-2xl border ${
                  field.value === icon
                    ? "border-emerald-500 bg-emerald-500/20"
                    : "border-zinc-800 bg-zinc-900"
                }`}
              >
                <Text className="text-2xl">{icon}</Text>
              </Pressable>
            ))}
          </View>
        )}
      />

      <ShowError error={errors.icon} />
    </View>
  );
}
