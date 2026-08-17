import { z } from "zod";

export const planTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  estimatedMinutes: z.number().int().positive(),
  category: z.string().min(1),
});

export const studyPlanSchema = z.object({
  summary: z.string().min(1),
  tasks: z.array(planTaskSchema).min(1).max(10),
});

export type StudyPlan = z.infer<typeof studyPlanSchema>;