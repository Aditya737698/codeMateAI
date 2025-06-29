import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge"; // Optional for Next.js Edge Functions

export async function POST(req: NextRequest) {
  const { userInput } = await req.json();

  const response = await fetch("https://api.groq.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mixtral-8x7b-32768",
      messages: [
        {
          role: "system",
          content: `You are a helpful bug assistant.
Always reply ONLY as numbered bullet steps, exactly in this format:

1. Step one  
2. Step two  
3. Step three

No paragraphs. Each step must be on a new line.`
        },
        {
          role: "user",
          content: userInput,
        },
      ],
    }),
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;

  return NextResponse.json({ reply });
}