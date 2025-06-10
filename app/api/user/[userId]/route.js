import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const db = await connectToDatabase();
    const user = await db.collection("users").findOne({
      _id: new ObjectId(params.userId),
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" });
    }

    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error("User fetch error:", err);
    return NextResponse.json({ success: false, error: "Database error" });
  }
}
