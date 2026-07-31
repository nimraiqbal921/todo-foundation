import { tool } from "ai";
import { z } from "zod";

export const getTodosTool = tool({
  description: "Get a list of todos based on category",

  inputSchema: z.object({
    category: z
      .string()
      .describe("Category of todos like work, personal, or study"),
  }),

  execute: async ({ category }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (category.toLowerCase() === "error") {
      throw new Error("Failed to fetch todos");
    }

    return {
      category,

      todos: [
        {
          id: 1,
          title: "Finish AI Capstone",
          completed: false,
        },
        {
          id: 2,
          title: "Push project to GitHub",
          completed: true,
        },
        {
          id: 3,
          title: "Deploy on Vercel",
          completed: false,
        },
      ],
    };
  },
});