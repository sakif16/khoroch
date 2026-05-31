import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Family from "@/models/Family";
import { generateFamilyCode } from "@/lib/generateFamilyCode";
import { auth, db} from "@/lib/auth";
import { ObjectId } from "mongodb"; // BetterAuth

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // 1. Create family
    const family = await Family.create({
      name: body.name,
      code: generateFamilyCode(),
      createdBy: session.user.id,
    });

    // 2. Update user (BetterAuth-managed user)
    await db.collection("user").updateOne(
      { _id: new ObjectId(session.user.id) },
      { $set: { familyId: family._id.toString() } }
    );

    return NextResponse.json({
      familyId: family._id,
      code: family.code,
    });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}