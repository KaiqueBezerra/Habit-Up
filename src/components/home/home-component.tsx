import { useAuth } from "@/context/auth-context";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Greetings } from "./greetings";

export function HomeComponent() {
  const { user, logout } = useAuth();

  const [firebaseError, setFirebaseError] = useState("");

  async function handleLogout() {
    try {
      setFirebaseError("");

      await logout();

      router.push("/");
    } catch (error) {
      setFirebaseError("Não foi possível deslogar.");
    }
  }

  return (
    <View className="flex-1 bg-zinc-950 px-6 pt-16">
      <Greetings name={user?.displayName} />
    </View>
  );
}
