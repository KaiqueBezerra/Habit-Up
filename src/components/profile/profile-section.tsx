import { useAuth } from "@/context/auth-context";
import { router } from "expo-router";
import { KeyRound, MailCheck, SquareCheck, UserPen } from "lucide-react-native";
import { Text, View } from "react-native";
import { ProfileItem } from "./profile-item";

export function ProfileSection() {
  const { user } = useAuth();

  return (
    <View className="mt-14">
      <View className="gap-1">
        <Text className="text-xl font-bold text-white">Conta</Text>
        <View className="mt-2 h-px bg-zinc-800" />
      </View>

      <View className="mt-2 gap-2">
        <ProfileItem
          title="Editar Perfil"
          icon={<UserPen color="white" size={20} />}
          onPress={() => router.push("/(screens)/edit-profile")}
        />

        <ProfileItem
          title="Alterar senha"
          icon={<KeyRound color="white" size={20} />}
          onPress={() => {
            router.push("/(screens)/change-password");
          }}
        />

        <ProfileItem
          title={user?.emailVerified ? "E-mail verificado" : "Verificar e-mail"}
          icon={
            user?.emailVerified ? (
              <SquareCheck color="green" size={20} />
            ) : (
              <MailCheck color="white" size={20} />
            )
          }
          onPress={() => router.push("/(screens)/verify-email")}
        />
      </View>
    </View>
  );
}
