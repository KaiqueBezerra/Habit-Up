import { ChevronRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export type ProfileItemProps = {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
};

export function ProfileItem({ title, icon, onPress }: ProfileItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center rounded-xl px-2 py-4 active:bg-zinc-900"
    >
      {icon}

      <View className="ml-3 flex-1 flex-row items-center justify-between">
        <Text className="text-base text-white">{title}</Text>

        <ChevronRight size={20} color="#71717A" />
      </View>
    </Pressable>
  );
}
