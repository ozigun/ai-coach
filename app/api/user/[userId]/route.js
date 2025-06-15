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

export async function PUT(req, { params }) {
  try {
    const db = await connectToDatabase();
    const updates = await req.json();
    const result = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(params.userId) }, { $set: updates });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Update error:", err);
    return NextResponse.json({ success: false, error: "Update failed" });
  }
}
