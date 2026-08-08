import { ShowError } from "@/components/ui/show-error/show-error";
import { useCreateHabit } from "@/hooks/habits/use-create-habits";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
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

const createHabitSchema = z
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
    goalValue: z
      .string()
      .optional()
      .refine(
        (value) => !value || Number(value) > 0,
        "A meta deve ser maior que zero",
      ),
    goalUnit: z
      .string()
      .trim()
      .max(20, "A unidade deve ter no máximo 20 caracteres"),
  })
  .refine(
    (data) => {
      if (data.goalType === "number") {
        return (
          !!data.goalValue &&
          Number(data.goalValue) > 0 &&
          (data.goalUnit ?? "").trim().length > 0
        );
      }

      return true;
    },
    {
      path: ["goalValue"],
      message: "Informe uma meta válida.",
    },
  );
type CreateHabitFormData = z.infer<typeof createHabitSchema>;

export function CreateHabitComponent() {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateHabitFormData>({
    resolver: zodResolver(createHabitSchema),
    defaultValues: {
      title: "",
      description: "",
      icon: "",
      color: "",
      daysOfWeek: [],
      reminderTime: "",
      goalType: "boolean",
      goalValue: "",
      goalUnit: "",
    },
  });

  const createHabit = useCreateHabit();

  const goalType = watch("goalType");
  const icon = watch("icon");
  const title = watch("title");
  const description = watch("description");
  const color = watch("color");

  async function handleCreateHabit(data: CreateHabitFormData) {
    try {
      await createHabit.mutateAsync({
        ...data,
        goalValue:
          data.goalType === "number" && data.goalValue
            ? Number(data.goalValue)
            : undefined,
      });

      router.push("/(tabs)/habits");
    } catch {}
  }

  return (
    <ScrollView
      className="flex-1 bg-zinc-950 px-6 pt-16"
      contentContainerClassName="pb-10"
    >
      <View className="mb-8">
        <Pressable
          onPress={() => router.push("/(tabs)/habits")}
          className="h-11 w-11 items-center justify-center rounded-full bg-zinc-900"
        >
          <ArrowLeft color="white" size={20} />
        </Pressable>
      </View>

      <View>
        <Text className="text-4xl font-bold text-white">Criar Hábito</Text>
        <Text className="mt-3 text-base text-zinc-400">
          Crie um novo hábito para acompanhar.
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
          <HabitPreview
            icon={icon}
            title={title}
            description={description}
            color={color}
          />

          <ShowError error={createHabit.error} />

          <Pressable
            onPress={handleSubmit(handleCreateHabit)}
            disabled={isSubmitting}
            className={`rounded-2xl bg-emerald-500 py-4 ${
              isSubmitting && "opacity-60"
            }`}
          >
            <Text className="text-center text-lg font-semibold text-white">
              {isSubmitting ? "Criando..." : "Criar hábito"}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
