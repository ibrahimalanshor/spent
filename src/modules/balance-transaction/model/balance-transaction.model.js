const { model } = require('mongoose');
const BalanceTransactionSchema = require('./balance-transaction.schema.js');

module.exports = model('balance-transaction', BalanceTransactionSchema);
