import { useAuth } from "@/context/auth-context";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ShowError } from "../ui/show-error/show-error";

export function VerifyEmailComponent() {
  const { user, verifyEmail, reloadUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [firebaseError, setFirebaseError] = useState<unknown>(null);

  async function handleVerifyEmail() {
    if (!user?.email) {
      setFirebaseError("Usuário inválido.");
      return;
    }
    try {
      setLoading(true);
      setFirebaseError("");

      await verifyEmail();
      setEmailSent(true);
    } catch (error) {
      setFirebaseError(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleReloadUser() {
    if (!user?.email) {
      setFirebaseError("Usuário inválido.");
      return;
    }
    try {
      setLoading(true);
      setFirebaseError("");

      await reloadUser();
      router.push("/(tabs)/profile");
    } catch (error) {
      setFirebaseError(error);
    } finally {
      setLoading(false);
    }
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

      <ShowError error={firebaseError} />

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
              disabled={loading}
              onPress={() => handleVerifyEmail()}
              className={`mt-10 rounded-2xl bg-emerald-500 py-4 ${
                loading ? "opacity-60" : ""
              }`}
            >
              <Text className="text-center text-lg font-semibold text-white">
                {loading ? "Enviando..." : "Enviar e-mail"}
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
