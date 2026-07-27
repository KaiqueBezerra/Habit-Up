import { useAuth } from "@/context/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, Pressable, Text, TextInput, View } from "react-native";
import z from "zod";
import { ShowError } from "../ui/show-error/show-error";

const editProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .max(20, "Nome deve ter no máximo 20 caracteres"),
});

type EditProfileFormData = z.infer<typeof editProfileSchema>;

export function EditProfileComponent() {
  const { user, updateUserProfile } = useAuth();

  const [firebaseError, setFirebaseError] = useState<unknown>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user?.displayName ?? "",
    },
  });

  async function handleEditProfile(data: EditProfileFormData) {
    try {
      setFirebaseError("");

      Keyboard.dismiss();

      await updateUserProfile(data.name);

      router.push("/(tabs)/profile");
    } catch (error) {
      setFirebaseError(error);
    }
  }

  return (
    <View className="flex-1 justify-center bg-zinc-950 px-8">
      <View>
        <Text className="text-4xl font-bold text-white">Editar Perfil</Text>
        <Text className="mt-3 text-base text-zinc-400">
          Atualize as informações da sua conta.
        </Text>
      </View>

      <View className="mb-6">
        <View className="mt-6">
          <View>
            <Text className="mb-2 text-sm font-medium text-zinc-300">Nome</Text>

            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextInput
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="Digite seu novo nome de usuário"
                  placeholderTextColor="#71717a"
                  maxLength={20}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-base text-white"
                />
              )}
            />

            <ShowError error={errors.name} />
          </View>
        </View>

        <View className="mt-6">
          <Text className="mb-2 text-sm font-medium text-zinc-300">E-mail</Text>

          <View className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4">
            <Text className="text-base text-zinc-500">{user?.email}</Text>
          </View>
        </View>
      </View>

      <ShowError error={firebaseError} />

      <View>
        <Pressable
          disabled={isSubmitting}
          onPress={handleSubmit(handleEditProfile)}
          className={`mt-10 rounded-2xl bg-emerald-500 py-4 ${
            isSubmitting ? "opacity-60" : ""
          }`}
        >
          <Text className="text-center text-lg font-semibold text-white">
            {isSubmitting ? "Salvando..." : "Salvar alterações"}
          </Text>
        </Pressable>
      </View>

      <Pressable
        className="mt-5"
        onPress={() => router.push("/(tabs)/profile")}
      >
        <Text className="text-center font-semibold text-emerald-400">
          Voltar
        </Text>
      </Pressable>
    </View>
  );
}
