import { router } from "expo-router";
import { KeyRound, MailCheck, UserPen } from "lucide-react-native";
import { Text, View } from "react-native";
import { ProfileItem } from "./profile-item";

export function ProfileSection() {
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
          onPress={() => {}}
        />

        <ProfileItem
          title="Alterar senha"
          icon={<KeyRound color="white" size={20} />}
          onPress={() => {
            router.push("/(tabs)/profile/change-password");
          }}
        />

        <ProfileItem
          title="Verificar e-mail"
          icon={<MailCheck color="white" size={20} />}
          onPress={() => {}}
        />
      </View>
    </View>
  );
}
