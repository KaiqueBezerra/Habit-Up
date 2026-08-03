import { Plus } from "lucide-react-native";
import { View } from "react-native";
import { FloatingActionButton } from "../ui/floating-action-button/floating-action-button";
import { HabitsContent } from "./habits-content/habits-content";
import { HabitsHeader } from "./habits-header";

export default function HabitsComponent() {
  return (
    <View className="flex-1 bg-zinc-950 px-6">
      <HabitsHeader />
      <HabitsContent />
      <FloatingActionButton pathname={"/(screens)/create-habit"} icon={Plus} />
    </View>
  );
}
