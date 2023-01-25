const { model } = require('mongoose');
const BalanceTransactionCategorySchema = require('./balance-transaction-category.schema.js');

module.exports = model(
  'balance-transaction-category',
  BalanceTransactionCategorySchema
);
