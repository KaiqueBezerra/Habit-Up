import { useAuth } from "@/context/auth-provider";
import { useReloadUser } from "@/hooks/auth/use-reload-user";
import { useVerifyEmail } from "@/hooks/auth/use-verify-email";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ShowError } from "../ui/show-error/show-error";

export function VerifyEmailComponent() {
  const { user } = useAuth();

  const verifyEmail = useVerifyEmail();
  const reloadUser = useReloadUser();

  const [emailSent, setEmailSent] = useState(false);

  async function handleVerifyEmail() {
    try {
      await verifyEmail.mutateAsync();

      setEmailSent(true);
    } catch {}
  }

  async function handleReloadUser() {
    try {
      await reloadUser.mutateAsync();

      router.back();
    } catch {}
  }

  if (user?.emailVerified) {
    return (
      <View className="flex-1 justify-center bg-zinc-950 px-8">
        <View>
          <Text className="text-4xl font-bold text-emerald-400">
            E-mail verificado!
          </Text>

          <Text className="mt-3 text-base leading-6 text-zinc-400">
            Sua conta já possui um e-mail verificado. {""}
            Obrigado por manter sua conta segura.
          </Text>
        </View>

        <View className="mt-6">
          <Pressable
            onPress={() => router.push("/(tabs)/profile")}
            className="mt-10 rounded-2xl bg-emerald-500 py-4"
          >
            <Text className="text-center text-lg font-semibold text-white">
              Voltar
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center bg-zinc-950 px-8">
      {emailSent ? (
        <View className="mb-6">
          <Text className="text-4xl font-bold text-emerald-400">
            E-mail enviado!
          </Text>

          <Text className="mt-3 text-base leading-6 text-zinc-400">
            Enviamos um link de verificação para
          </Text>

          <Text className="mt-2 text-lg font-semibold text-emerald-400">
            {user?.email}
          </Text>

          <Text className="mt-3 text-base leading-6 text-zinc-400">
            Após clicar no link, volte ao aplicativo e toque em "Já confirmei
            meu e-mail".
          </Text>

          <Text className="text-sm text-zinc-500">
            Caso não encontre o e-mail, verifique também sua caixa de spam.
          </Text>
        </View>
      ) : (
        <View className="mb-6">
          <Text className="text-4xl font-bold text-white">
            Verificar e-mail
          </Text>

          <Text className="mt-3 text-base leading-6 text-zinc-400">
            Enviaremos um e-mail para
          </Text>

          <Text className="mt-2 text-lg font-semibold text-emerald-400">
            {user?.email}
          </Text>

          <Text className="mt-3 text-base leading-6 text-zinc-400">
            Após clicar no link recebido, volte ao aplicativo para atualizar o
            status.
          </Text>
        </View>
      )}

      <ShowError error={verifyEmail.error ?? reloadUser.error} />

      <View>
        {emailSent ? (
          <>
            <Pressable
              onPress={handleReloadUser}
              className="mt-6 rounded-2xl border border-emerald-500 py-4"
            >
              <Text className="text-center text-lg font-semibold text-emerald-400">
                Já confirmei meu e-mail
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.push("/(tabs)/profile")}
              className="mt-4 rounded-2xl bg-emerald-500 py-4"
            >
              <Text className="text-center text-lg font-semibold text-white">
                Voltar
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable
              disabled={verifyEmail.isPending}
              onPress={() => handleVerifyEmail()}
              className={`mt-10 rounded-2xl bg-emerald-500 py-4 ${
                verifyEmail.isPending ? "opacity-60" : ""
              }`}
            >
              <Text className="text-center text-lg font-semibold text-white">
                {verifyEmail.isPending ? "Enviando..." : "Enviar e-mail"}
              </Text>
            </Pressable>

            <Pressable
              className="mt-5"
              onPress={() => router.push("/(tabs)/profile")}
            >
              <Text className="text-center font-semibold text-emerald-400">
                Voltar
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}
