import { streamText } from "ai";
import { MODEL, SYSTEM_PROMPT } from "@/lib/ai";
import { getTodosTool } from "@/lib/tools";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("BODY:", JSON.stringify(body, null, 2));

    const result = streamText({
      model: MODEL,

      system: SYSTEM_PROMPT,

      messages: body.messages.map((message: any) => ({
        role: message.role,
        content: message.parts
          .map((part: any) => part.text)
          .join(""),
      })),

      tools: {
        getTodos: getTodosTool,
      },

      onError({ error }) {
        console.error("STREAM ERROR:", error);
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("CHAT ERROR:", error);

    return new Response(
      JSON.stringify({
        error: "Something went wrong",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}