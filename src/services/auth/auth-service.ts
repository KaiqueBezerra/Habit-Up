import { auth, db } from "@/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

export async function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function register(
  email: string,
  password: string,
  displayName: string,
) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName });

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    displayName,
    email,
    createdAt: serverTimestamp(),
  });

  return user;
}

export async function logout() {
  return signOut(auth);
}

export async function verifyEmail() {
  if (!auth.currentUser) throw new Error();

  return sendEmailVerification(auth.currentUser);
}

export async function resetPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}

export async function updateUserProfile(displayName: string) {
  if (!auth.currentUser) {
    throw new Error("Usuário não autenticado.");
  }

  await updateProfile(auth.currentUser, {
    displayName,
  });

  await updateDoc(doc(db, "users", auth.currentUser.uid), {
    displayName,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteAccount() {
  if (!auth.currentUser) throw new Error();

  return deleteUser(auth.currentUser);
}
