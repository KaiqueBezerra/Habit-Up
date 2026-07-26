import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native";
import { ShowError } from "../show-error/show-error";

type ConfirmModalProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  danger?: boolean;
  error?: unknown;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
};

export function ConfirmModal({
  visible,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  loading = false,
  danger = false,
  error,
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 items-center justify-center bg-black/60 px-6"
        onPress={onClose}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="w-full rounded-3xl bg-zinc-900 p-6"
        >
          <Text className="text-2xl font-bold text-white">{title}</Text>

          <Text className="mt-2 text-base leading-6 text-zinc-400">
            {message}
          </Text>

          {error != null && (
            <View className="mt-4">
              <ShowError error={error} />
            </View>
          )}

          <View className="mt-8 flex-row justify-end gap-3">
            <Pressable
              onPress={onClose}
              className="rounded-xl bg-zinc-800 px-5 py-3 active:opacity-80"
            >
              <Text className="font-medium text-white">{cancelText}</Text>
            </Pressable>

            <Pressable
              disabled={loading}
              onPress={onConfirm}
              className={`rounded-xl px-5 py-3 ${
                danger ? "bg-red-600" : "bg-emerald-500"
              } ${loading ? "opacity-50" : ""}`}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="font-medium text-white">{confirmText}</Text>
              )}
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
