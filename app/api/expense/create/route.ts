import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Expense from "@/models/Expense";
import { auth, db } from "@/lib/auth";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";


export async function POST(req: NextRequest) {
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

    const body = await req.json();


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

    // 4. Create expense
    const expense = await Expense.create({
      familyId: user.familyId,
      userId: session.user.id,
      userName: user.name || "Unknown",
      title: body.title,
      amount: body.amount,
      category: body.category,
      expenseDate: new Date(body.expenseDate),
    });

    // 5. Return response
    return NextResponse.json({
      success: true,
      expense,
      
    });
    

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}