import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import { Pressable } from "react-native";

export function FloatingActionButton() {
  return (
    <Pressable
      onPress={() => router.push("/(screens)/create-habit")}
      className="absolute bottom-8 right-6 h-16 w-16 items-center 
        justify-center rounded-full bg-emerald-500 shadow-lg"
    >
      <Plus color="white" size={30} />
    </Pressable>
  );
}
