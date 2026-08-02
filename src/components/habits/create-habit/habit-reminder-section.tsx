import { ShowError } from "@/components/ui/show-error/show-error";
import DateTimePicker, {
  DateTimePickerChangeEvent,
} from "@react-native-community/datetimepicker";
import { Clock3 } from "lucide-react-native";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

type Props = {
  control: any;
  errors: any;
};

export function HabitReminderSection({ control, errors }: Props) {
  const [showPicker, setShowPicker] = useState(false);

  function getDateFromTime(time?: string) {
    const date = new Date();

    if (!time) return date;

    const [hours, minutes] = time.split(":").map(Number);

    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);

    return date;
  }

  return (
    <View>
      <Text className="mb-2 text-sm font-medium text-zinc-300">
        Horário do lembrete
      </Text>

      <Controller
        control={control}
        name="reminderTime"
        render={({ field }) => {
          function handleValueChange(
            event: DateTimePickerChangeEvent,
            date: Date,
          ) {
            setShowPicker(false);

            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");

            field.onChange(`${hours}:${minutes}`);
          }

          return (
            <>
              <Pressable
                onPress={() => setShowPicker(true)}
                className="flex-row items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4"
              >
                <Text
                  className={
                    field.value
                      ? "text-base text-white"
                      : "text-base text-zinc-500"
                  }
                >
                  {field.value || "Selecione um horário"}
                </Text>

                <Clock3 color="#A1A1AA" size={20} />
              </Pressable>

              {showPicker && (
                <DateTimePicker
                  value={getDateFromTime(field.value)}
                  mode="time"
                  is24Hour
                  display="default"
                  onValueChange={handleValueChange}
                />
              )}
            </>
          );
        }}
      />

      <ShowError error={errors.reminderTime} />
    </View>
  );
}
