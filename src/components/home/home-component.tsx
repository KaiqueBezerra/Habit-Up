import { useAuth } from "@/context/auth-provider";
import { useSyncHabitsStatistics } from "@/hooks/habits/useSyncHabitsStatistics";
import { useHomeData } from "@/hooks/use-home-data";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { ScrollView } from "react-native";
import { Loading } from "../ui/loading/loading";
import { HomeEmpty } from "./home-empty";
import { HomeGreetings } from "./home-greetings";
import { HomeNextHabit } from "./home-next-habits";
import { HomeProgress } from "./home-progress";
import { HomeStatistics } from "./home-statistics";
import { HomeSummary } from "./home-summary";

export function HomeComponent() {
  const { user } = useAuth();
  const { data, isLoading } = useHomeData();
  const syncStatistics = useSyncHabitsStatistics();

  useFocusEffect(
    useCallback(() => {
      if (user?.uid) {
        syncStatistics.mutate();
      }
    }, [user?.uid]),
  );

  if (isLoading) {
    return <Loading />;
  }

  if (data.totalHabits === 0) {
    return <HomeEmpty />;
  }

  return (
    <ScrollView
      className="flex-1 bg-zinc-950 px-6 pt-16"
      contentContainerClassName="pb-10"
    >
      <HomeGreetings name={user?.displayName} />
      <HomeProgress
        totalToday={data.totalToday}
        completedToday={data.completedToday}
      />
      <HomeStatistics
        currentStreak={data.currentStreak}
        totalCompletions={data.totalCompletions}
      />
      <HomeSummary
        totalToday={data.totalToday}
        completedToday={data.completedToday}
        pendingToday={data.pendingToday}
      />
      {data.nextHabits.length > 0 && (
        <HomeNextHabit nextHabits={data.nextHabits} />
      )}
    </ScrollView>
  );
}
