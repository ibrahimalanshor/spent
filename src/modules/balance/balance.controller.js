const Controller = require('../../../lib/controller/controller.js');
const BalanceService = require('./balance.service.js');

exports.getAll = new Controller()
  .get()
  .ctx('query')
  .handle(async (ctx) => await BalanceService.getAll(ctx.query));
