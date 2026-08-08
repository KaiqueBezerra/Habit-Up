import { HabitOptionsSheet } from "@/components/ui/bottom-sheet/habit-options-sheet";
import { Button } from "@/components/ui/button/button";
import { ConfirmModal } from "@/components/ui/confirm-modal/confirm-modal";
import { Loading } from "@/components/ui/loading/loading";
import { useAuth } from "@/context/auth-provider";
import { calculateHabitSuccessRate } from "@/helpers/get-habit-success-rate";
import { useDeleteHabit } from "@/hooks/habits/use-delete-habit";
import { useGetHabit } from "@/hooks/habits/use-get-habit";
import { useGetHabitHistory } from "@/hooks/habits/use-get-habit-history";
import { useGetTodayCompletion } from "@/hooks/habits/use-get-today-completion";
import { useToggleHabitCompletion } from "@/hooks/habits/use-toggle-habit-completion";
import { useSyncHabitsStatistics } from "@/hooks/habits/useSyncHabitsStatistics";
import BottomSheet from "@gorhom/bottom-sheet";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
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

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { user } = useAuth();

  const { data: habit, isLoading: isHabitLoading } = useGetHabit(id);
  const deleteHabit = useDeleteHabit();

  const toggleCompletion = useToggleHabitCompletion(id);
  const { data: completion } = useGetTodayCompletion(id);
  const { data: completedDates = [] } = useGetHabitHistory(id);
  const syncStatistics = useSyncHabitsStatistics();

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

  useFocusEffect(
    useCallback(() => {
      if (user?.uid) {
        syncStatistics.mutate();
      }
    }, [user?.uid]),
  );

  if (isHabitLoading) {
    return <Loading />;
  }

  async function handleToggleCompletion() {
    await toggleCompletion.mutateAsync();
  }

  const statistics = habit
    ? calculateHabitSuccessRate(
        habit.createdAt.toDate(),
        habit.daysOfWeek,
        completedDates,
      )
    : null;

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
        <HabitDetailsStatistics
          streak={habit?.streak}
          createdAt={habit?.createdAt}
          successRate={statistics?.successRate ?? 0}
          totalCompletions={habit?.totalCompletions ?? 0}
          extraCompletions={statistics?.extraCompletions ?? 0}
        />

        <Button
          title={completion ? "Desfazer conclusão" : "Marcar como concluído"}
          onPress={handleToggleCompletion}
          loading={toggleCompletion.isPending}
          className="mt-8 mb-10"
          variant="primary"
        />
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
