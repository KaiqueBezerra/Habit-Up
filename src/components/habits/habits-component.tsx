import { View } from "react-native";
import { FloatingActionButton } from "./floating-action-button";
import { HabitsContent } from "./habits-content";
import { HabitsHeader } from "./habits-header";

export default function HabitsComponent() {
  return (
    <View className="flex-1 bg-zinc-950 px-6">
      <HabitsHeader />
      <HabitsContent />
      <FloatingActionButton />
    </View>
  );
}
