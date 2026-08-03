import { useAuth } from "@/context/auth-provider";
import { View } from "react-native";
import { Greetings } from "./greetings";

export function HomeComponent() {
  const { user } = useAuth();

  return (
    <View className="flex-1 bg-zinc-950 px-6 pt-16">
      <Greetings name={user?.displayName} />
    </View>
  );
}
