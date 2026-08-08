import { Pressable, Text } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "outline";
};

export function Button({
  title,
  onPress,
  loading = false,
  disabled = false,
  className = "",
  variant = "primary",
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const variantClasses = {
    primary: "bg-emerald-500",
    outline: "border border-emerald-500",
  };

  const textVariantClasses = {
    primary: "text-white",
    outline: "text-emerald-400",
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={`
        rounded-2xl py-4 active:opacity-80
        ${variantClasses[variant]}
        ${isDisabled ? "opacity-60" : ""}
        ${className}
      `}
    >
      <Text
        className={`
          text-center text-lg font-semibold
          ${textVariantClasses[variant]}
        `}
      >
        {title}
      </Text>
    </Pressable>
  );
}
