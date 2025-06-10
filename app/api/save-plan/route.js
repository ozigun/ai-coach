import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  const body = await req.json();
  const { email, password, ...rest } = body;

  if (!email || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  const db = await connectToDatabase();

  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await db.collection("users").insertOne({
    email,
    password: hashedPassword,
    ...rest,
    createdAt: new Date(),
  });

  return NextResponse.json({
    success: true,
    userId: result.insertedId.toString(),
  });
}
