import { generateText, Output } from "ai";
import { MODEL } from "@/lib/ai";
import { z } from "zod";

const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string(),
  estimatedMinutes: z.number(),
  category: z.string(),
  completed: z.boolean(),
});

const planSchema = z.object({
  summary: z.string(),

  recommendedTasks: z.array(
    z.object({
      taskId: z.string(),
      reason: z.string(),
    })
  ),

  workloadWarning: z.string(),

  session: z.array(
    z.object({
      time: z.string(),
      activity: z.string(),
    })
  ),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const tasks = z.array(taskSchema).parse(body.tasks);

    const activeTasks = tasks.filter(
      (task) => !task.completed
    );

    if (activeTasks.length === 0) {
      return Response.json({
        plan: {
          summary:
            "You have completed all your current tasks! 🎉",
          recommendedTasks: [],
          workloadWarning:
            "No pending workload detected.",
          session: [
            {
              time: "Now",
              activity:
                "Take a break or add a new academic goal.",
            },
          ],
        },
      });
    }

    const result = await generateText({
      model: MODEL,

      output: Output.object({
        schema: planSchema,
      }),

      system: `
You are StudyFlow's AI academic planning assistant.

Your job is to analyze the user's REAL tasks and create
a practical academic plan.

Consider:
- priority
- due date
- estimated effort
- category
- workload balance

IMPORTANT RULES:

- Only use tasks provided by the user.
- Never invent tasks.
- Never change task IDs.
- Never change deadlines.
- Never invent academic information.
- Recommend the most appropriate task first.
- Consider both urgency and priority.
- Consider estimated time when ordering tasks.
- Identify whether the workload appears overloaded.
- Create a realistic study session.
- Keep the response concise and practical.

For recommendedTasks:
- Include every active task.
- Order them from most important to least important.
- Use the exact task ID supplied by the user.
- Explain briefly why each task has that position.

For session:
- Create a realistic sequence of activities based on
  the user's estimated task times.
- Do not create activities for tasks that do not exist.
`,

      prompt: `
Here are the user's current active tasks:

${JSON.stringify(activeTasks, null, 2)}

Analyze these tasks and create the recommended StudyFlow plan.
`,
    });

    return Response.json({
      plan: result.output,
    });
  } catch (error) {
    console.error("PLAN ERROR:", error);

    return Response.json(
      {
        error: "Unable to generate a study plan.",
      },
      {
        status: 500,
      }
    );
  }
}
