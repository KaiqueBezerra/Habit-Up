import { useAuth } from "@/context/auth-context";
import { Text, View } from "react-native";

export function ProfileHeader() {
  const { user } = useAuth();

  return (
    <View className="items-center">
      <View className="h-24 w-24 items-center justify-center rounded-full bg-emerald-500/20">
        <Text className="text-4xl font-bold text-emerald-400">
          {user?.displayName?.charAt(0).toUpperCase() ?? "U"}
        </Text>
      </View>

      <Text className="mt-4 text-2xl font-bold text-white">
        {user?.displayName}
      </Text>

      <Text className="mt-1 text-base text-zinc-400">{user?.email}</Text>

      <Text className="mt-2 text-center text-sm text-zinc-500">
        Continue cuidando da sua saúde todos os dias 🌱
      </Text>
    </View>
  );
}
