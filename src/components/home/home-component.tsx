import { useAuth } from "@/context/auth-provider";
import { useLogout } from "@/hooks/auth/use-logout";
import { router } from "expo-router";
import { View } from "react-native";
import { Greetings } from "./greetings";

export function HomeComponent() {
  const { user } = useAuth();

  const logout = useLogout();

  async function handleLogout() {
    try {
      await logout.mutateAsync();

      router.push("/");
    } catch {}
  }

  return (
    <View className="flex-1 bg-zinc-950 px-6 pt-16">
      <Greetings name={user?.displayName} />
    </View>
  );
}
