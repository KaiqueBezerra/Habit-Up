import { auth } from "@/firebase/firebase";
import {
    createUserWithEmailAndPassword,
    deleteUser,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";

export const AuthService = {
  login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  },

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  },

  logout() {
    return signOut(auth);
  },

  verifyEmail() {
    if (!auth.currentUser) throw new Error();

    return sendEmailVerification(auth.currentUser);
  },

  resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  },

  updateProfile(displayName: string) {
    if (!auth.currentUser) throw new Error();

    return updateProfile(auth.currentUser, {
      displayName,
    });
  },

  deleteAccount() {
    if (!auth.currentUser) throw new Error();

    return deleteUser(auth.currentUser);
  },
};
