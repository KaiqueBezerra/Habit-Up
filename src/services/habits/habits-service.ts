import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";
import type { Habit } from "./types";

function getCollection(uid: string) {
  if (!uid) {
    throw new Error("Usuário não autenticado.");
  }

  return collection(db, "users", uid, "habits");
}

export async function createHabit(
  data: Omit<Habit, "id" | "createdAt" | "updatedAt">,
  uid: string,
) {
  const payload = Object.fromEntries(
    Object.entries({
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }).filter(([, value]) => value !== undefined),
  );

  return addDoc(getCollection(uid), payload);
}

export async function getHabits(uid: string): Promise<Habit[]> {
  const habitsQuery = query(getCollection(uid), orderBy("createdAt", "desc"));

  const snapshot = await getDocs(habitsQuery);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Habit[];
}

export async function getHabitById(
  id: string,
  uid: string,
): Promise<Habit | null> {
  const snapshot = await getDoc(doc(getCollection(uid), id));

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Habit;
}

export async function updateHabit(
  id: string,
  data: Partial<Omit<Habit, "id" | "createdAt" | "updatedAt">>,
  uid: string,
) {
  await updateDoc(doc(getCollection(uid), id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteHabit(id: string, uid: string) {
  await deleteDoc(doc(getCollection(uid), id));
}
