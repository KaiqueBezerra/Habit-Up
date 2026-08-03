import { Href, router } from "expo-router";
import { LucideIcon } from "lucide-react-native";
import { Pressable } from "react-native";

type FloatingActionButtonProps = {
  pathname: Href;
  icon: LucideIcon;
};

export function FloatingActionButton({
  pathname,
  icon: Icon,
}: FloatingActionButtonProps) {
  return (
    <Pressable
      onPress={() => router.push(pathname)}
      className="absolute bottom-8 right-6 h-16 w-16 items-center justify-center rounded-full bg-emerald-500 shadow-lg"
    >
      <Icon size={30} color="white" />
    </Pressable>
  );
}
