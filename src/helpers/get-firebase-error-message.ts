import { FirebaseError } from "firebase/app";

export function getFirebaseErrorMessage(error: unknown) {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/user-not-found":
        return "Usuário não encontrado.";

      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "E-mail ou senha inválidos.";

      case "auth/email-already-in-use":
        return "E-mail já está em uso por outra conta.";

      case "auth/account-exists-with-different-credential":
        return "Já existe uma conta com este e-mail usando outro método de login.";

      case "auth/requires-recent-login":
        return "Faça login novamente para concluir esta operação.";

      case "auth/too-many-requests":
        return "Muitas tentativas. Tente novamente em alguns minutos.";

      default:
        console.log(error);
        return "Algo deu errado. Tente novamente.";
    }
  }

  console.log(error);
  return "Algo deu errado. Tente novamente.";
}
