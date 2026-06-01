import { Schema, model, models } from "mongoose";

const ExpenseSchema = new Schema(
  {
    familyId: {
      type: Schema.Types.ObjectId,
      ref: "Family",
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Food",
        "Transportation",
        "Accessories",
        "Health",
        "Education",
        "Other",
      ],
      default: "Other",
    },

    expenseDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Expense = models.Expense || model("Expense", ExpenseSchema);

export default Expense;