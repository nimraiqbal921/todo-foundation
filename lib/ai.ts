import { groq } from "@ai-sdk/groq";

// Groq model
export const model = groq("llama-3.1-8b-instant");

// System prompt
export const SYSTEM_PROMPT = `
You are a helpful AI assistant.

Be friendly.
Be concise.
Give accurate answers.
If you don't know something, say so instead of making it up.
`;