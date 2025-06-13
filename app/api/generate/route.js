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

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo", // alternatif: "mistralai/mixtral-8x7b"
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    const data = await response.json();
    console.log("OpenRouter raw response:", data); // ✅ Debug log

    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error("Invalid response from OpenRouter");
    }

    return NextResponse.json({ result: data.choices[0].message.content });
  } catch (error) {
    console.error("OpenRouter error:", error);
    return NextResponse.json(
      { error: "AI generation failed" },
      { status: 500 }
    );
  }
}
