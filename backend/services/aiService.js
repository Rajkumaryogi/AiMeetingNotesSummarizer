import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateSummary(transcript, instruction) {
  const prompt = `
You are an AI meeting notes assistant.
Instruction: ${instruction}
Transcript: ${transcript}
Provide the structured summary:
  `;
  
  const response = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}
