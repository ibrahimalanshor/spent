const { createRouter } = require('@ibrahimalanshor/tabri');

const BalanceTransactionController = require('./balance-transaction.controller.js');

module.exports = createRouter([
  {
    path: '/balance-transactions',
    method: 'get',
    handler: BalanceTransactionController.getAll,
  },
]);
