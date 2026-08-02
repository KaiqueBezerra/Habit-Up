import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthProvider } from "@/context/auth-provider";
import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import "../styles/global.css";

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaView>
  );
}
