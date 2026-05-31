import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Family from "@/models/Family";
import { auth } from "@/lib/auth";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const family = await Family.findOne({
      code: body.code,
    });

    if (!family) {
      return NextResponse.json(
        { error: "Invalid family code" },
        { status: 404 }
      );
    }

    const db = mongoose.connection.db;

    if (!db) {
      return NextResponse.json(
        { error: "Database connection unavailable" },
        { status: 500 }
      );
    }

    await db.collection("user").updateOne(
      { _id: new ObjectId(session.user.id) },
      {
        $set: {
          familyId: family._id.toString(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      familyId: family._id,
      familyName: family.name,
    });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}