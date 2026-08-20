import type { Task } from "./types";

export const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Finish DBMS assignment",
    description: "Complete the remaining database queries and documentation.",
    priority: "high",
    dueDate: "2026-08-18",
    estimatedMinutes: 120,
    category: "Assignment",
    completed: false,
  },
  {
    id: "2",
    title: "Review normalization",
    description: "Review 1NF, 2NF, 3NF and BCNF.",
    priority: "medium",
    dueDate: "2026-08-20",
    estimatedMinutes: 60,
    category: "Study",
    completed: false,
  },
  {
    id: "3",
    title: "Practice SQL queries",
    description: "Complete 15 SQL practice questions.",
    priority: "low",
    dueDate: "2026-08-21",
    estimatedMinutes: 45,
    category: "Practice",
    completed: false,
  },
  {
    id: "4",
    title: "Submit programming lab",
    description: "Upload the completed programming lab.",
    priority: "high",
    dueDate: "2026-08-17",
    estimatedMinutes: 30,
    category: "Deadline",
    completed: true,
  },
];