import { useAuth } from "@/context/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import z from "zod";
import { ShowError } from "../ui/show-error/show-error";

const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .max(20, "Nome deve ter no máximo 20 caracteres"),

  email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),

  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(20, "Senha deve ter no máximo 20 caracteres"),
});

type registerFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const { register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [firebaseError, setFirebaseError] = useState<unknown>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<registerFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function handleRegister(data: registerFormData) {
    try {
      setFirebaseError("");

      await register(data.email, data.password, data.name);

      router.push("/(tabs)/home");
    } catch (error) {
      setFirebaseError(error);
    }
  }

  return (
    <ScrollView
      className="flex-1 bg-zinc-950"
      contentContainerClassName="justify-center flex-grow px-8 py-10"
    >
      <Text className="text-4xl font-bold text-white">Criar conta</Text>

      <Text className="mt-2 text-zinc-400">
        Comece hoje a construir hábitos saudáveis.
      </Text>

      <View className="mt-10 gap-5">
        <View>
          <Text className="mb-2 text-zinc-300">Nome</Text>

          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextInput
                value={field.value}
                onChangeText={field.onChange}
                placeholder="Digite seu nome"
                placeholderTextColor="#71717A"
                className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-white"
              />
            )}
          />

          <ShowError error={errors.name} />
        </View>

        <View>
          <Text className="mb-2 text-zinc-300">E-mail</Text>

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextInput
                value={field.value}
                onChangeText={field.onChange}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="Digite seu e-mail"
                placeholderTextColor="#71717A"
                className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-white"
              />
            )}
          />

          <ShowError error={errors.email} />
        </View>

        <View>
          <Text className="mb-2 text-zinc-300">Senha</Text>

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
                  placeholderTextColor="#71717A"
                  className="flex-1 rounded-l-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-white"
                />
              )}
            />

            <Pressable
              className="justify-center rounded-r-2xl border border-l-0 border-zinc-800 bg-zinc-900 px-4"
              onPress={() => setShowPassword(!showPassword)}
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

        <ShowError error={firebaseError} />

        <Pressable
          disabled={isSubmitting}
          onPress={handleSubmit(handleRegister)}
          className={`rounded-2xl bg-emerald-500 py-4 ${
            isSubmitting && "opacity-60"
          }`}
        >
          <Text className="text-center text-lg font-semibold text-white">
            {isSubmitting ? "Criando..." : "Criar conta"}
          </Text>
        </Pressable>

        <Pressable onPress={() => router.back()}>
          <Text className="text-center text-emerald-400">
            Já possui uma conta? Entrar
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
