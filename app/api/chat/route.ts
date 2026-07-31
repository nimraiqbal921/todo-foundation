import { streamText } from "ai";
import { SYSTEM_PROMPT, MODEL } from "@/lib/ai";



export async function POST(req:Request){


  const {messages} = await req.json();



  const result = streamText({


    model: MODEL,


    system: SYSTEM_PROMPT,


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