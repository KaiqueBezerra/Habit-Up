import { ToastProvider } from "@/components/ui/toast/toast-provider";
import { AuthProvider } from "@/context/auth-provider";
import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import "../styles/global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-zinc-950">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Slot />
            <ToastProvider />
          </AuthProvider>
        </QueryClientProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
