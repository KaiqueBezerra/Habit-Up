import { FirebaseError } from "firebase/app";
import type { FieldError } from "react-hook-form";
import { Text } from "react-native";

import { getFirebaseErrorMessage } from "@/helpers/get-firebase-error-message";

type Props = {
  error?: unknown;
};

export function ShowError({ error }: Props) {
  if (!error) return null;

  let message = "";

  if (error instanceof FirebaseError) {
    message = getFirebaseErrorMessage(error);
  } else if (
    typeof error === "object" &&
    error !== null &&
    "message" in error
  ) {
    message = (error as FieldError).message ?? "";
  } else if (typeof error === "string") {
    message = error;
  }

  if (!message) return null;

  return <Text className="mt-1 text-sm text-red-500">{message}</Text>;
}
