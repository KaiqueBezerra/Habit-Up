import { useAuth } from "@/context/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { z } from "zod";
import { ShowError } from "../ui/show-error/show-error";

const loginSchema = z.object({
  email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),

  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(20, "Senha deve ter no máximo 20 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginComponent() {
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [firebaseError, setFirebaseError] = useState<unknown>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin(data: LoginFormData) {
    try {
      setFirebaseError("");

      await login(data.email, data.password);

      router.push("/(tabs)/home");
    } catch (error) {
      setFirebaseError(error);
    }
  }

  return (
    <View className="flex-1 justify-center bg-zinc-950 px-8">
      <View className="mb-12">
        <Text className="text-4xl font-bold text-white">Bem-vindo</Text>

        <Text className="mt-3 text-base leading-6 text-zinc-400">
          Faça login para continuar utilizando o Habit Up.
        </Text>
      </View>

      <View className="gap-5">
        <View>
          <Text className="mb-2 text-sm font-medium text-zinc-300">E-mail</Text>

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextInput
                value={field.value}
                onChangeText={field.onChange}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Digite seu e-mail"
                placeholderTextColor="#71717a"
                className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-base text-white"
              />
            )}
          />

          <ShowError error={errors.email} />
        </View>

        <View>
          <Text className="mb-2 text-sm font-medium text-zinc-300">Senha</Text>

          <View className="flex-row">
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <TextInput
                  value={field.value}
                  onChangeText={field.onChange}
                  secureTextEntry={!showPassword}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#71717a"
                  className="flex-1 rounded-l-2xl border border-r-0 border-zinc-800 bg-zinc-900 px-5 py-4 text-base text-white"
                />
              )}
            />

            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              className="items-center justify-center rounded-r-2xl border border-zinc-800 bg-zinc-900 px-4"
            >
              {showPassword ? (
                <EyeOff color="white" size={20} />
              ) : (
                <Eye color="white" size={20} />
              )}
            </Pressable>
          </View>

          <ShowError error={errors.password} />
        </View>
      </View>

      <ShowError error={firebaseError} />

      <Pressable
        className="mt-4 self-end"
        onPress={() => router.push("/(auth)/forgot-password")}
      >
        <Text className="font-medium text-emerald-400">
          Esqueceu sua senha?
        </Text>
      </Pressable>

      <Pressable
        disabled={isSubmitting}
        onPress={handleSubmit(handleLogin)}
        className={`mt-10 rounded-2xl bg-emerald-500 py-4 ${
          isSubmitting ? "opacity-60" : ""
        }`}
      >
        <Text className="text-center text-lg font-semibold text-white">
          {isSubmitting ? "Entrando..." : "Entrar"}
        </Text>
      </Pressable>

      <View className="mt-10 flex-row justify-center">
        <Text className="text-zinc-400">Ainda não possui conta?</Text>

        <Pressable
          className="ml-2"
          onPress={() => router.push("/(auth)/register")}
        >
          <Text className="font-semibold text-emerald-400">Criar conta</Text>
        </Pressable>
      </View>
    </View>
  );
}
