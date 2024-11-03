// app/api/chatWithOllama/route.ts
import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";

interface OllamaResponse {
  model: string;
  created_at: Date;
  response: string;
  done: boolean;
  done_reason: string;
  context: [];
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
}

export async function POST(req: NextRequest) {
  console.log("hello there");
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json(
      { message: "Prompt is required" },
      { status: 400 },
    );
  }

  const endpoint = "http://localhost:11434/api/generate"; // Change to your actual endpoint

  const payload = {
    model: "llama3.2",
    prompt: prompt,
    stream: false,
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error querying the model: ${response.statusText}`);
    }

    const data: OllamaResponse = (await response.json()) as OllamaResponse;
    return NextResponse.json({ response: data.response });
  } catch (error) {
    console.error("Failed to query the model:", (error as Error).message);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
