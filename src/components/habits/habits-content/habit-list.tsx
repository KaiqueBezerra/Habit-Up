import { router } from "expo-router";
import { FlatList } from "react-native";

import { Habit } from "@/services/habits/types";
import { HabitCard } from "./habit-card";

type HabitListProps = {
  habits: Habit[];
};

export function HabitList({ habits }: HabitListProps) {
  return (
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
          onPress={() =>
            router.push({
              pathname: "/habits",
              params: {
                id: item.id,
              },
            })
          }
          onMenuPress={() => {
            // abrir BottomSheet futuramente
          }}
        />
      )}
    />
  );
}
