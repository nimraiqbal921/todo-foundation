
import type { Task } from "./types";

const STORAGE_KEY = "studyflow-tasks";

export function getTasks(): Task[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as Task[];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
