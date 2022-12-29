const {
  createRouter,
  createRequestValidator,
} = require('@ibrahimalanshor/tabri');

const BalanceTransactionController = require('./balance-transaction.controller.js');
const BalanceTransactionRequest = require('./requests');

module.exports = createRouter([
  {
    path: '/balance-transactions',
    method: 'get',
    handler: BalanceTransactionController.getAll,
  },
  {
    path: '/balance-transactions',
    method: 'post',
    handler: [
      createRequestValidator(BalanceTransactionRequest.create),
      BalanceTransactionController.create,
    ],
  },
]);
