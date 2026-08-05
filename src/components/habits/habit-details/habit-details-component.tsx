import { HabitOptionsSheet } from "@/components/ui/bottom-sheet/habit-options-sheet";
import { ConfirmModal } from "@/components/ui/confirm-modal/confirm-modal";
import { Loading } from "@/components/ui/loading/loading";
import { useDeleteHabit } from "@/hooks/habits/use-delete-habit";
import { useGetHabit } from "@/hooks/habits/use-get-habit";
import BottomSheet from "@gorhom/bottom-sheet";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { HabitDetailsDescription } from "./habit-details-description";
import { HabitDetailsFrequency } from "./habit-details-frequency";
import { HabitDetailsHeader } from "./habit-details-header";
import { HabitDetailsStatistics } from "./habit-details-statistics";
import { HabitDetailsReminder } from "./habit-detrails-reminder";
import { HabitDetailsGoal } from "./habits-details-goal";

export function HabitDetailsComponent() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { data: habit, isLoading } = useGetHabit(id);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const deleteHabit = useDeleteHabit();

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleEdit() {
    bottomSheetRef.current?.close();

    router.push({
      pathname: "/(screens)/update-habit",
      params: { id },
    });
  }

  function handleOpenDeleteModal() {
    bottomSheetRef.current?.close();
    setDeleteModalOpen(true);
  }

  async function handleDeleteHabit() {
    try {
      await deleteHabit.mutateAsync(id);
      setDeleteModalOpen(false);
      router.push("/(tabs)/habits");
    } catch {}
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-zinc-950">
      <ScrollView
        className="flex-1 px-6 pt-16"
        contentContainerClassName="pb-10"
      >
        <HabitDetailsHeader
          onMenuPress={() => bottomSheetRef.current?.expand()}
        />
        <HabitDetailsDescription
          title={habit?.title}
          description={habit?.description}
          color={habit?.color}
          icon={habit?.icon}
        />
        <HabitDetailsFrequency
          daysOfWeek={habit?.daysOfWeek || []}
          color={habit?.color}
        />
        {habit?.reminderTime && (
          <HabitDetailsReminder reminderTime={habit?.reminderTime} />
        )}
        <HabitDetailsGoal
          goalType={habit?.goalType}
          goalValue={habit?.goalValue}
          goalUnit={habit?.goalUnit}
        />
        <HabitDetailsStatistics />

        <Pressable className="mt-8  mb-10 rounded-2xl bg-emerald-500 py-4">
          <Text className="text-center text-lg font-semibold text-white">
            Marcar como concluído
          </Text>
        </Pressable>
      </ScrollView>

      <HabitOptionsSheet
        ref={bottomSheetRef}
        title={habit?.title || ""}
        icon={habit?.icon || ""}
        header={false}
        onEdit={handleEdit}
        onDelete={handleOpenDeleteModal}
      />

      <ConfirmModal
        visible={deleteModalOpen}
        title="Excluir hábito"
        message="Esta ação é permanente e não poderá ser desfeita."
        confirmText="Excluir"
        danger
        loading={deleteHabit.isPending}
        error={deleteHabit.error}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteHabit}
      />
    </View>
  );
}
