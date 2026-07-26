import { ActivityIndicator, Text, View } from "react-native";

type Props = {
  text?: string;
};

export function Loading({ text }: Props) {
  return (
    <View className="flex-1 items-center justify-center bg-zinc-950">
      <ActivityIndicator size="large" color="#10B981" />

      {text && <Text className="mt-4 text-zinc-400">{text}</Text>}
    </View>
  );
}
