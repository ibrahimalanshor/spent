const { Schema } = require('mongoose');

const ExpenseSchema = new Schema(
  {
    amount: Number,
    description: {
      type: String,
      default: null,
    },
    proof: {
      type: String,
      default: null,
    },
    balanceId: {
      type: Schema.Types.ObjectId,
      ref: 'balance',
    },
    expenseCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'expense-category',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = ExpenseSchema;
