import { Text, View } from "react-native";

type HabitDetailsDescriptionProps = {
  title: string | undefined;
  description: string | undefined;
  color: string | undefined;
  icon: string | undefined;
};

export function HabitDetailsDescription({
  title,
  description,
  color,
  icon,
}: HabitDetailsDescriptionProps) {
  return (
    <View className="mt-8 items-center">
      <View
        className="h-24 w-24 items-center justify-center rounded-3xl"
        style={{ backgroundColor: color ? `${color}25` : "#000" }}
      >
        <Text className="text-5xl">{icon || "💧"}</Text>
      </View>

      <Text className="mt-5 text-3xl font-bold text-white">
        {title || "Hábito"}
      </Text>

      <Text className="mt-2 text-center text-base text-zinc-400">
        {description || "Descrição do hábito"}
      </Text>
    </View>
  );
}
