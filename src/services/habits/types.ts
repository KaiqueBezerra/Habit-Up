export interface Habit {
  id: string;
  title: string;
  description?: string;

  icon: string;
  color: string;

  frequency: "daily" | "weekly";

  reminderEnabled: boolean;
  reminderTime?: string;

  createdAt: Date;
  updatedAt: Date;
}
