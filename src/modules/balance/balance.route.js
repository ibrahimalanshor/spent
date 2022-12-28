const { createRouter } = require('@ibrahimalanshor/tabri');

const BalanceController = require('./balance.controller.js');

module.exports = createRouter([
  {
    path: '/balances',
    method: 'get',
    handler: BalanceController.getAll,
  },
]);
