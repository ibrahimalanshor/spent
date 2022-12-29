const {
  exceptions: { NotFoundException, BadRequestException },
} = require('@ibrahimalanshor/tabri');
const Controller = require('../../../lib/controller/controller.js');
const BalanceTransactionService = require('./balance-transaction.service.js');
const BalanceService = require('../balance/balance.service.js');

exports.getAll = new Controller()
  .get()
  .ctx('query')
  .handle(async (ctx) => await BalanceTransactionService.getAll(ctx.query));

exports.create = new Controller()
  .post()
  .ctx('body')
  .handle(async (ctx) => {
    try {
      const balance = await BalanceService.findOne(ctx.body.balanceId);

      return await BalanceTransactionService.create(ctx.body, {
        balance,
      });
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new BadRequestException(
          {},
          'balance-transaction.validation.balance-not-found'
        );
      }

      throw err;
    }
  });
