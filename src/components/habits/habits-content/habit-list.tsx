import { router } from "expo-router";
import { FlatList } from "react-native";

import { HabitOptionsSheet } from "@/components/ui/bottom-sheet/habit-options-sheet";
import { ConfirmModal } from "@/components/ui/confirm-modal/confirm-modal";
import { useDeleteHabit } from "@/hooks/habits/use-delete-habit";
import { Habit } from "@/services/habits/types";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { HabitCard } from "./habit-card";

type HabitListProps = {
  habits: Habit[];
};

export function HabitList({ habits }: HabitListProps) {
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const deleteHabit = useDeleteHabit();

  async function handleDeleteHabit() {
    try {
      await deleteHabit.mutateAsync(
        habits.find((habit) => habit.id === selectedHabit?.id)?.id!,
      );
      setDeleteModalOpen(false);
    } catch {}
  }

  return (
    <>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        renderItem={({ item }) => (
          <HabitCard
            icon={item.icon}
            title={item.title}
            description={item.description}
            color={item.color}
            reminderTime={item.reminderTime}
            daysOfWeek={item.daysOfWeek}
            goalType={item.goalType}
            goalValue={item.goalValue}
            goalUnit={item.goalUnit}
            onPress={() =>
              router.push({
                pathname: "/(screens)/habit-details",
                params: {
                  id: item.id,
                },
              })
            }
            onMenuPress={() => {
              setSelectedHabit(item);
              bottomSheetRef.current?.expand();
            }}
          />
        )}
      />
      <HabitOptionsSheet
        ref={bottomSheetRef}
        title={selectedHabit?.title || ""}
        icon={selectedHabit?.icon || ""}
        onEdit={() => {
          bottomSheetRef.current?.close();

          router.push({
            pathname: "/(screens)/update-habit",
            params: {
              id: selectedHabit?.id,
            },
          });
        }}
        onDelete={() => {
          bottomSheetRef.current?.close();
          setDeleteModalOpen(true);
        }}
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
    </>
  );
}
