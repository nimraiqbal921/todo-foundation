export type Priority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  dueDate: string;
  estimatedMinutes: number;
  category: string;
  completed: boolean;
};