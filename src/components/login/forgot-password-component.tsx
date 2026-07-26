import { useAuth } from "@/context/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { z } from "zod";
import { ShowError } from "../ui/show-error/show-error";

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordComponent() {
  const [emailSent, setEmailSent] = useState(false);
  const [firebaseError, setFirebaseError] = useState<unknown>(null);

  const { resetPassword } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function handleResetPassword(data: ForgotPasswordFormData) {
    try {
      setFirebaseError("");

      await resetPassword(data.email);
      setEmailSent(true);
    } catch (error) {
      setFirebaseError(error);
    }
  }

  return (
    <View className="flex-1 justify-center bg-zinc-950 px-8">
      {emailSent ? (
        <View>
          <Text className="text-4xl font-bold text-green-500">
            E-mail enviado!
          </Text>

          <Text className="mt-3 text-base leading-6 text-zinc-400">
            Verifique sua caixa de entrada e siga as instruções para criar uma
            nova senha.
          </Text>
        </View>
      ) : (
        <View className="mb-12">
          <Text className="text-4xl font-bold text-white">
            Esqueceu a senha?
          </Text>

          <Text className="mt-3 text-base leading-6 text-zinc-400">
            Informe o seu e-mail para receber o link de recuperação.
          </Text>
        </View>
      )}

      {!emailSent && (
        <View className="gap-5">
          <View>
            <Text className="mb-2 text-sm font-medium text-zinc-300">
              E-mail
            </Text>
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
        </View>
      )}

      <ShowError error={firebaseError} />

      {emailSent ? (
        <Pressable
          onPress={() => router.back()}
          className="mt-10 rounded-2xl bg-emerald-500 py-4"
        >
          <Text className="text-center text-lg font-semibold text-white">
            Voltar ao login
          </Text>
        </Pressable>
      ) : (
        <Pressable
          disabled={isSubmitting}
          onPress={handleSubmit(handleResetPassword)}
          className={`mt-10 rounded-2xl bg-emerald-500 py-4 ${
            isSubmitting ? "opacity-60" : ""
          }`}
        >
          <Text className="text-center text-lg font-semibold text-white">
            {isSubmitting ? "Enviando..." : "Enviar"}
          </Text>
        </Pressable>
      )}

      {!emailSent && (
        <View className="mt-10 flex-row justify-center">
          <Text className="text-zinc-400">Quer voltar ao login?</Text>

          <Pressable className="ml-2" onPress={() => router.back()}>
            <Text className="font-semibold text-emerald-400">Voltar</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
