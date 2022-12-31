const { Schema } = require('mongoose');
const ExpenseVirtual = require('./expense.virtual.js');

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
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

for (const virtual in ExpenseVirtual) {
  ExpenseSchema.virtual(virtual).get(ExpenseVirtual[virtual]);
}

module.exports = ExpenseSchema;
