import { db } from "@/firebase/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { calculateStreak } from "./calculate-streak";
import { HabitHistory } from "./types";

function getCollection(uid: string, habitId: string) {
  if (!uid) {
    throw new Error("Usuário não autenticado.");
  }

  return collection(db, "users", uid, "habits", habitId, "history");
}

export async function completeHabit(uid: string, habitId: string) {
  const today = new Intl.DateTimeFormat("en-CA").format(new Date()); // "2026-08-05"

  await setDoc(doc(db, "users", uid, "habits", habitId, "history", today), {
    id: today,
    completedAt: serverTimestamp(),
  });

  await syncHabitStatistics(uid, habitId);
}

export async function uncompleteHabit(
  uid: string,
  habitId: string,
  completedDate: string,
) {
  await deleteDoc(doc(getCollection(uid, habitId), completedDate));

  await syncHabitStatistics(uid, habitId);
}

export async function isHabitCompleted(
  habitId: string,
  uid: string,
  completedDate: string,
): Promise<HabitHistory | null> {
  const snapshot = await getDoc(
    doc(getCollection(uid, habitId), completedDate),
  );

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as HabitHistory;
}

export async function syncHabitStatistics(uid: string, habitId: string) {
  const historyRef = collection(db, "users", uid, "habits", habitId, "history");

  const snapshot = await getDocs(historyRef);

  const dates = snapshot.docs.map((doc) => doc.id).sort(); // yyyy-MM-dd fica em ordem cronológica

  const totalCompletions = dates.length;

  const lastCompletedDate =
    totalCompletions > 0 ? dates[totalCompletions - 1] : "";

  const streak = calculateStreak(dates);

  await updateDoc(doc(db, "users", uid, "habits", habitId), {
    streak,
    totalCompletions,
    lastCompletedDate,
    updatedAt: serverTimestamp(),
  });
}

export async function getTodayCompletedHabits(uid: string): Promise<string[]> {
  const today = new Intl.DateTimeFormat("en-CA").format(new Date());

  const habitsSnapshot = await getDocs(collection(db, "users", uid, "habits"));

  const completedHabits: string[] = [];

  await Promise.all(
    habitsSnapshot.docs.map(async (habit) => {
      const historyDoc = await getDocs(
        collection(db, "users", uid, "habits", habit.id, "history"),
      );

      if (historyDoc.docs.some((doc) => doc.id === today)) {
        completedHabits.push(habit.id);
      }
    }),
  );

  return completedHabits;
}
