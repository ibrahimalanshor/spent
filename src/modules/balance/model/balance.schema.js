const { Schema } = require('mongoose');

const BalanceSchema = new Schema({
  amount: {
    type: Number,
    default: 0,
  },
});

module.exports = BalanceSchema;
