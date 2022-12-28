const Controller = require('../../../lib/controller/controller.js');
const BalanceTransactionService = require('./balance-transaction.service.js');

exports.getAll = new Controller()
  .get()
  .ctx('query')
  .handle(async (ctx) => await BalanceTransactionService.getAll(ctx.query));
