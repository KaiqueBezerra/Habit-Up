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
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
