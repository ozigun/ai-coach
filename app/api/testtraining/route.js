import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { userId, pushups, squats, plank, burpees, date } = body;

  if (
    !userId ||
    pushups == null ||
    squats == null ||
    plank == null ||
    burpees == null
  ) {
    return NextResponse.json({ error: "Eksik veri" }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();

    const testEntry = {
      userId,
      date: date || new Date().toISOString(),
      testResults: {
        pushups,
        squats,
        plank,
        burpees,
      },
    };

    await db.collection("performanceTests").insertOne(testEntry);

    await db
      .collection("users")
      .updateOne({ _id: userId }, { $set: { hasCompletedInitialTest: true } });

    return NextResponse.json({
      success: true,
      message: "Test başarıyla kaydedildi",
    });
  } catch (error) {
    console.error("Performans testi kaydında hata:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
