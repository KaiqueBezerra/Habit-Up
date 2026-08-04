import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Pencil, Trash2 } from "lucide-react-native";
import { forwardRef, useMemo } from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  title: string;
  icon: string;
  onEdit: () => void;
  onDelete: () => void;
};

export const HabitOptionsSheet = forwardRef<BottomSheet, Props>(
  ({ onEdit, onDelete, title, icon }, ref) => {
    const snapPoints = useMemo(() => ["32%"], []);

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        enablePanDownToClose
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: "#18181b",
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
        }}
        handleIndicatorStyle={{
          backgroundColor: "#71717a",
          width: 48,
        }}
      >
        <BottomSheetView className="px-6 pb-8">
          <View className="items-center py-4">
            <View className="mb-3 h-16 w-16 items-center justify-center rounded-full bg-zinc-800">
              <Text className="text-3xl">{icon}</Text>
            </View>

            <Text className="text-xl font-bold text-white">{title}</Text>

            <Text className="mt-1 text-sm text-zinc-400">
              Escolha uma ação para este hábito
            </Text>
          </View>

          <View className="mt-2 border-t border-zinc-800 pt-5">
            <Pressable
              onPress={onEdit}
              android_ripple={{ color: "#3f3f46" }}
              className="flex-row items-center rounded-2xl bg-zinc-800 px-4 py-4"
            >
              <View className="h-10 w-10 items-center justify-center rounded-full bg-zinc-700">
                <Pencil size={20} color="white" />
              </View>

              <Text className="ml-4 text-base font-medium text-white">
                Editar hábito
              </Text>
            </Pressable>

            <Pressable
              onPress={onDelete}
              android_ripple={{ color: "#7f1d1d" }}
              className="mt-4 flex-row items-center rounded-2xl bg-red-500/10 px-4 py-4"
            >
              <View className="h-10 w-10 items-center justify-center rounded-full bg-red-500/20">
                <Trash2 size={20} color="#ef4444" />
              </View>

              <Text className="ml-4 text-base font-medium text-red-500">
                Excluir hábito
              </Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

HabitOptionsSheet.displayName = "HabitOptionsSheet";
