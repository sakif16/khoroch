import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Expense from "@/models/Expense";
import { auth, db } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // 1. Get session
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Get user from BetterAuth DB
    const user = await db.collection("user").findOne({
      _id: new ObjectId(session.user.id),
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // 3. Check family membership
    if (!user.familyId) {
      return NextResponse.json(
        { error: "User is not in a family" },
        { status: 400 }
      );
    }

    // 4. Pagination params
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get("limit") || "20", 10))
    );
    const skip = (page - 1) * limit;

    // 5. Fetch expenses + total count
    const [expenses, total] = await Promise.all([
      Expense.find({ familyId: user.familyId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Expense.countDocuments({ familyId: user.familyId }),
    ]);

    const hasMore = skip + expenses.length < total;

    return NextResponse.json({
      success: true,
      expenses,
      page,
      limit,
      total,
      hasMore,
      currentUserId: session.user.id,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}