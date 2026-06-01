import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Expense from "@/models/Expense";
import { auth, db } from "@/lib/auth";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // 1. Auth
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }


    // 2. Get user
    const user = await db.collection("user").findOne({
      _id: new ObjectId(session.user.id),
    });

    if (!user?.familyId) {
      return NextResponse.json(
        { error: "No family found" },
        { status: 400 }
      );
    }

    const familyId = user.familyId;

    // 3. Date range (current month)
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // 4. Get all expenses for family (this month)
    const expenses = await Expense.find({
      familyId,
      expenseDate: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    // 5. Total spending
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);

    // 6. Category breakdown
    const categoryMap: Record<string, number> = {};

    expenses.forEach((e) => {
      categoryMap[e.category] =
        (categoryMap[e.category] || 0) + e.amount;
    });

    const categoryBreakdown = Object.entries(categoryMap).map(
      ([category, amount]) => ({
        category,
        amount,
      })
    );

    // 7. User breakdown
    const userMap: Record<string, number> = {};

    expenses.forEach((e) => {
      userMap[e.userName] =
        (userMap[e.userName] || 0) + e.amount;
    });

    const userBreakdown = Object.entries(userMap).map(
      ([user, amount]) => ({
        user,
        amount,
      })
    );

    // 8. Recent expenses
    const recentExpenses = await Expense.find({
      familyId,
    })
      .sort({ createdAt: -1 })
      .limit(10);

    // 9. Response
    return NextResponse.json({
      total,
      categoryBreakdown,
      userBreakdown,
      recentExpenses,
    });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}