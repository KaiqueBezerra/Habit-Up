import { Loading } from "@/components/ui/loading/loading";
import { ShowError } from "@/components/ui/show-error/show-error";
import { useGetHabit } from "@/hooks/habits/use-get-habit";
import { useUpdateHabit } from "@/hooks/habits/use-update-habit";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import z from "zod";
import { HabitBasicInfo } from "../habit-form/habit-basic-info";
import { HabitColorPicker } from "../habit-form/habit-color-picker";
import { HabitDaysPicker } from "../habit-form/habit-days-picker";
import { HabitGoalSection } from "../habit-form/habit-goal-section";
import { HabitIconPicker } from "../habit-form/habit-icon-picker";
import { HabitPreview } from "../habit-form/habit-preview";
import { HabitReminderSection } from "../habit-form/habit-reminder-section";

const updateHabitSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(2, "O título deve ter pelo menos 2 caracteres")
      .max(50, "O título deve ter no máximo 50 caracteres"),
    description: z
      .string()
      .trim()
      .max(150, "A descrição deve ter no máximo 150 caracteres"),
    icon: z.string().min(1, "Selecione um ícone"),
    color: z.string().min(1, "Selecione uma cor"),
    daysOfWeek: z
      .array(z.number().min(0).max(6))
      .min(1, "Selecione pelo menos um dia da semana"),
    reminderTime: z
      .string()
      .regex(/^$|^([01]\d|2[0-3]):([0-5]\d)$/, "Informe um horário válido"),
    goalType: z.enum(["boolean", "number"]),
    goalValue: z.number().positive().optional(),
    goalUnit: z
      .string()
      .trim()
      .max(20, "A unidade deve ter no máximo 20 caracteres"),
  })
  .refine(
    (data) => {
      if (data.goalType === "number") {
        return (
          data.goalValue !== undefined &&
          (data.goalUnit ?? "").trim().length > 0
        );
      }

      return true;
    },
    {
      path: ["goalUnit"],
      message: "Informe a unidade da meta.",
    },
  );

type UpdateHabitFormData = z.infer<typeof updateHabitSchema>;

export function UpdateHabitComponent() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { data: habit, isLoading } = useGetHabit(id);

  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateHabitFormData>({
    resolver: zodResolver(updateHabitSchema),
    defaultValues: {
      title: "",
      description: "",
      icon: "",
      color: "",
      daysOfWeek: [],
      reminderTime: "",
      goalType: "boolean",
      goalValue: undefined,
      goalUnit: "",
    },
  });

  const updateHabit = useUpdateHabit(id);

  const goalType = watch("goalType");
  const icon = watch("icon");
  const title = watch("title");
  const description = watch("description");

  async function handleUpdateHabit(data: UpdateHabitFormData) {
    try {
      await updateHabit.mutateAsync(data);

      router.push("/(tabs)/habits");
    } catch {}
  }

  useEffect(() => {
    if (!habit) return;

    reset({
      title: habit.title,
      description: habit.description,
      icon: habit.icon,
      color: habit.color,
      daysOfWeek: habit.daysOfWeek,
      reminderTime: habit.reminderTime ?? "",
      goalType: habit.goalType,
      goalValue: habit.goalValue,
      goalUnit: habit.goalUnit ?? "",
    });
  }, [habit, reset]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView
      className="flex-1 bg-zinc-950 px-6 pt-16"
      contentContainerClassName="pb-10"
    >
      <View>
        <Text className="text-4xl font-bold text-white">Editar Hábito</Text>
        <Text className="mt-3 text-base text-zinc-400">
          Edite as informações do hábito.
        </Text>
      </View>

      <View className="mb-6">
        <View className="mt-6 gap-5">
          <HabitBasicInfo control={control} errors={errors} />
          <HabitIconPicker control={control} errors={errors} />
          <HabitColorPicker control={control} errors={errors} />
          <HabitDaysPicker control={control} errors={errors} />
          <HabitReminderSection control={control} errors={errors} />
          <HabitGoalSection
            control={control}
            errors={errors}
            goalType={goalType}
          />
          <HabitPreview icon={icon} title={title} description={description} />

          <ShowError error={updateHabit.error} />

          <Pressable
            onPress={handleSubmit(handleUpdateHabit)}
            disabled={isSubmitting}
            className={`rounded-2xl bg-emerald-500 py-4 ${
              isSubmitting && "opacity-60"
            }`}
          >
            <Text className="text-center text-lg font-semibold text-white">
              {isSubmitting ? "Salvando..." : "Salvar alterações"}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
