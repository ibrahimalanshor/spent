const { Schema } = require('mongoose');
const BalanceTransactionCategoryPopulate = require('./balance-transaction.populate.js');

const BalanceTransactionSchema = new Schema(
  {
    amount: Number,
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
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

for (const populate in BalanceTransactionCategoryPopulate) {
  BalanceTransactionSchema.virtual(
    populate,
    BalanceTransactionCategoryPopulate[populate]
  );
}

module.exports = BalanceTransactionSchema;
