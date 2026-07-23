import { useAuth } from "@/context/auth-context";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function HomeComponent() {
  const { user, logout } = useAuth();

  const [firebaseError, setFirebaseError] = useState("");

  async function handleLogout() {
    try {
      setFirebaseError("");

      await logout();

      router.replace("/");
    } catch (error) {
      setFirebaseError("Não foi possível deslogar.");
    }
  }

  return (
    <View className="flex-1 bg-zinc-950 justify-center px-8">
      <View className="items-center">
        <View className="mb-8 h-28 w-28 items-center justify-center rounded-full bg-emerald-500/15">
          <Text className="text-6xl">🌿</Text>
        </View>

        <View>
          <Text className="text-5xl font-bold text-white">Bem Vindo</Text>

          <Text className="text-center text-base leading-7 text-zinc-400">
            {user?.displayName}
          </Text>

          <Text className="text-center text-base leading-7 text-zinc-400">
            {user?.email}
          </Text>
        </View>
      </View>

      <View className="mt-24 gap-4">
        <TouchableOpacity
          onPress={() => handleLogout()}
          className="rounded-2xl bg-emerald-500 py-4 active:opacity-80"
        >
          <Text className="text-center text-lg font-semibold text-white">
            Sair
          </Text>
        </TouchableOpacity>
      </View>

      {firebaseError.length > 0 && (
        <Text className="mt-4 text-center text-red-500">{firebaseError}</Text>
      )}
    </View>
  );
}
