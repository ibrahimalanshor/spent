const { Schema } = require('mongoose');

const BalanceSchema = new Schema(
  {
    amount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = BalanceSchema;
