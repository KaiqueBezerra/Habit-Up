import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";
import type { Habit } from "./types";

export class HabitService {
  private static getCollection(uid: string) {
    if (!uid) {
      throw new Error("Usuário não autenticado.");
    }

    return collection(db, "users", uid, "habits");
  }

  static async create(
    data: Omit<Habit, "id" | "createdAt" | "updatedAt">,
    uid: string,
  ) {
    await addDoc(this.getCollection(uid), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  static async getAll(uid: string): Promise<Habit[]> {
    const habitsQuery = query(
      this.getCollection(uid),
      orderBy("createdAt", "desc"),
    );

    const snapshot = await getDocs(habitsQuery);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Habit[];
  }

  static async update(
    id: string,
    data: Partial<Omit<Habit, "id" | "createdAt">>,
    uid: string,
  ) {
    await updateDoc(doc(this.getCollection(uid), id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  }

  static async delete(id: string, uid: string) {
    await deleteDoc(doc(this.getCollection(uid), id));
  }
}
