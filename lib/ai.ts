import { createGroq } from "@ai-sdk/groq";


export const SYSTEM_PROMPT = `
You are a helpful AI assistant.

Answer clearly and politely.
Help users with programming, learning,
and general questions.
`;



export const groq = createGroq({

  apiKey: process.env.GROQ_API_KEY,

});



export const MODEL = groq(
  "llama-3.1-8b-instant"
);