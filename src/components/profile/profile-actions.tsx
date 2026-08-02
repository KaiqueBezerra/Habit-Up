import { useDeleteAccount } from "@/hooks/auth/use-delete-account";
import { useLogout } from "@/hooks/auth/use-logout";
import { router } from "expo-router";
import { LogOut, Trash2 } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ConfirmModal } from "../ui/confirm-modal/confirm-modal";

export function ProfileActions() {
  const logout = useLogout();
  const deleteAccount = useDeleteAccount();

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  async function handleLogout() {
    try {
      await logout.mutateAsync();
      router.push("/(auth)/login");
    } catch {}
  }

  async function handleDeleteAccount() {
    try {
      await deleteAccount.mutateAsync();
      router.push("/(auth)/login");
    } catch {}
  }

  return (
    <View className="mt-auto mb-8 gap-3">
      <Pressable
        className="flex-row items-center justify-center gap-2 rounded-xl border border-zinc-800 py-4 active:bg-zinc-900"
        onPress={() => setLogoutModalOpen(true)}
      >
        <LogOut size={20} color="white" />

        <Text className="font-medium text-white">Sair</Text>
      </Pressable>

      <Pressable
        className="flex-row items-center justify-center gap-2 rounded-xl border border-red-900 py-4 active:bg-red-950"
        onPress={() => setDeleteModalOpen(true)}
      >
        <Trash2 size={20} color="#ef4444" />

        <Text className="font-medium text-red-500">Excluir conta</Text>
      </Pressable>

      <ConfirmModal
        visible={logoutModalOpen}
        title="Sair da conta"
        message="Tem certeza que deseja sair da sua conta?"
        confirmText="Sair"
        loading={logout.isPending}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />

      <ConfirmModal
        visible={deleteModalOpen}
        title="Excluir conta"
        message="Esta ação é permanente e não poderá ser desfeita."
        confirmText="Excluir"
        danger
        loading={deleteAccount.isPending}
        error={deleteAccount.error}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </View>
  );
}
