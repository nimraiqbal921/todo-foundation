import { streamText } from "ai";
import { createGroq } from "@ai-sdk/groq";


const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});


export async function POST(req: Request) {

  const { messages } = await req.json();


  const result = streamText({

    model: groq("llama-3.1-8b-instant"),

    messages: messages.map((message:any)=>({
      role: message.role,
      content: message.parts
        .filter((part:any)=>part.type==="text")
        .map((part:any)=>part.text)
        .join("")
    }))

  });


  return result.toUIMessageStreamResponse();

}