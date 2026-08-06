import { Timestamp } from "firebase/firestore";

export type Habit = {
  id: string;

  title: string;
  description?: string;

  icon: string;
  color: string;

  daysOfWeek: number[];

  reminderTime?: string;

  goalType: "boolean" | "number";
  goalValue?: number;
  goalUnit?: string;

  streak: number;
  totalCompletions: number;
  lastCompletedDate: string;

  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type HabitRequest = {
  title: string;
  description?: string;

  icon: string;
  color: string;

  daysOfWeek: number[];

  reminderTime?: string;

  goalType: "boolean" | "number";
  goalValue?: number;
  goalUnit?: string;
};

export type HabitHistory = {
  id: string;
  completedAt: Timestamp;
};
