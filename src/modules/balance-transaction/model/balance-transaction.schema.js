const { Schema } = require('mongoose');

const BalanceTransactionSchema = new Schema(
  {
    amount: Number,
    type: {
      type: String,
      enum: ['income', 'outcome', 'expense'],
    },
    description: {
      type: String,
      default: null,
    },
    balanceId: {
      type: Schema.Types.ObjectId,
      ref: 'balance',
    },
    balanceTransactionCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'balance',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = BalanceTransactionSchema;
