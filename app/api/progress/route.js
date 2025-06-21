import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userId, date, workoutText, durationDone, difficulty } =
    await req.json();
  try {
    const db = await connectToDatabase();
    await db.collection("progress").insertOne({
      userId,
      date,
      workoutText,
      durationDone,
      difficulty,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Progress save error:", err);
    return NextResponse.json({ success: false });
  }
}

export async function GET(req) {
  const userId = req.nextUrl.searchParams.get("userId");
  try {
    const db = await connectToDatabase();
    const progress = await db.collection("progress").find({ userId }).toArray();

    return NextResponse.json({ success: true, progress });
  } catch (err) {
    return NextResponse.json({ success: false });
  }
}
