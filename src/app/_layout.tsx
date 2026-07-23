import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthProvider } from "@/context/auth-context";
import "../styles/global.css";

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </SafeAreaView>
  );
}
