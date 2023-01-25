const { Schema } = require('mongoose');

const BalanceTransactionCategorySchema = new Schema(
  {
    name: String,
    type: {
      type: String,
      enum: ['revenue', 'expense'],
      default: 'revenue',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = BalanceTransactionCategorySchema;
