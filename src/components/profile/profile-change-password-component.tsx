import { useAuth } from "@/context/auth-context";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ShowError } from "../ui/show-error/show-error";

export function ChangePasswordComponent() {
  const { user, resetPassword } = useAuth();

  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [firebaseError, setFirebaseError] = useState<unknown>(null);

  async function handleResetPassword() {
    if (!user?.email) {
      setFirebaseError("Usuário inválido.");
      return;
    }
    try {
      setLoading(true);
      setFirebaseError("");

      await resetPassword(user?.email);
      setEmailSent(true);
    } catch (error) {
      setFirebaseError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 justify-center bg-zinc-950 px-8">
      {emailSent ? (
        <View>
          <Text className="text-4xl font-bold text-emerald-400">
            E-mail enviado!
          </Text>

          <Text className="mt-3 text-base leading-6 text-zinc-400">
            Verifique sua caixa de entrada e siga as instruções para criar uma
            nova senha.
          </Text>

          <Text className="text-sm text-zinc-500">
            Caso não encontre o e-mail, verifique também sua caixa de spam.
          </Text>
        </View>
      ) : (
        <View>
          <Text className="text-4xl font-bold text-white">Redefinir senha</Text>

          <Text className="mt-3 text-base leading-6 text-zinc-400">
            Enviaremos um e-mail para{" "}
            <Text className="mt-2 text-lg font-semibold text-emerald-400">
              {user?.email}
            </Text>
            com instruções para atualizar sua senha.
          </Text>
        </View>
      )}

      <ShowError error={firebaseError} />

      <View className="mt-6">
        {emailSent ? (
          <Pressable
            onPress={() => router.back()}
            className="mt-10 rounded-2xl bg-emerald-500 py-4"
          >
            <Text className="text-center text-lg font-semibold text-white">
              Voltar
            </Text>
          </Pressable>
        ) : (
          <>
            <Pressable
              disabled={loading}
              onPress={() => handleResetPassword()}
              className={`mt-10 rounded-2xl bg-emerald-500 py-4 ${
                loading ? "opacity-60" : ""
              }`}
            >
              <Text className="text-center text-lg font-semibold text-white">
                {loading ? "Enviando..." : "Enviar"}
              </Text>
            </Pressable>

            <Pressable className="mt-5" onPress={() => router.back()}>
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
