import { getFormattedDate } from "@/helpers/get-formatted-date";
import { getGreeting } from "@/helpers/get-greeting";
import { Text, View } from "react-native";

export function Greetings({ name }: { name?: string | null }) {
  return (
    <View className="gap-2">
      <Text className="text-3xl font-bold text-white">
        {getGreeting()}, {name?.split(" ")[0] ?? "Usuário"}
      </Text>

      <Text className="text-base capitalize text-zinc-400">
        {getFormattedDate()}
      </Text>
    </View>
  );
}
