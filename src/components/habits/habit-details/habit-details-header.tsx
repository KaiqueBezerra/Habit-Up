import { router } from "expo-router";
import { ArrowLeft, EllipsisVertical } from "lucide-react-native";
import { Pressable, View } from "react-native";

type HabitDetailsHeaderProps = {
  onMenuPress: () => void;
};

export function HabitDetailsHeader({ onMenuPress }: HabitDetailsHeaderProps) {
  return (
    <>
      <View className="flex-row justify-between">
        <Pressable
          onPress={() => router.push("/(tabs)/habits")}
          className="h-11 w-11 items-center justify-center rounded-full bg-zinc-900"
        >
          <ArrowLeft color="white" size={20} />
        </Pressable>

        <Pressable
          onPress={onMenuPress}
          className="h-11 w-11 items-center justify-center rounded-full bg-zinc-900"
        >
          <EllipsisVertical color="white" size={20} />
        </Pressable>
      </View>
    </>
  );
}
