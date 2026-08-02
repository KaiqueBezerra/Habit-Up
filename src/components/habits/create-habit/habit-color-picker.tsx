import { ShowError } from "@/components/ui/show-error/show-error";
import { Controller } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { habitColors } from "./consts";

export function HabitColorPicker({ control, errors }: any) {
  return (
    <View>
      <Text className="mb-2 text-sm font-medium text-zinc-300">
        Cor <Text className="text-red-500">*</Text>
      </Text>

      <Controller
        control={control}
        name="color"
        render={({ field }) => (
          <View className="flex-row gap-3">
            {habitColors.map((color) => (
              <Pressable
                key={color}
                onPress={() => field.onChange(color)}
                style={{ backgroundColor: color }}
                className={`h-12 w-12 rounded-full ${
                  field.value === color ? "border-4 border-white" : ""
                }`}
              />
            ))}
          </View>
        )}
      />

      <ShowError error={errors.color} />
    </View>
  );
}
