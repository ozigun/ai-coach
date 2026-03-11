import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.error("API key is missing");
      return NextResponse.json(
        { error: "Server misconfiguration: Missing API key" },
        { status: 500 }
      );
    }

    const model = "openai/gpt-oss-120b:free";
    console.log("Using model:", model);

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter API error:", errorData);
      return NextResponse.json(
        { error: "OpenRouter API request failed", detail: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ result: data.choices[0].message.content });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "AI generation failed", detail: error.message },
      { status: 500 }
    );
  }
}
