const {
  exceptions: { NotFoundException, BadRequestException },
} = require('@ibrahimalanshor/tabri');
const Controller = require('../../../lib/controller/controller.js');
const MathHelper = require('../../helpers/math.helper.js');
const BalanceTransactionService = require('./balance-transaction.service.js');
const BalanceTransactionCategoryService = require('../balance-transaction-category/balance-transaction-category.service.js');
const BalanceService = require('../balance/balance.service.js');

exports.getAll = new Controller()
  .get()
  .ctx('query')
  .handle(async (ctx) => await BalanceTransactionService.getAll(ctx.query));

exports.findOne = new Controller()
  .get()
  .ctx('params')
  .handle(
    async (ctx) => await BalanceTransactionService.findOne(ctx.params.id)
  );

exports.create = new Controller()
  .post()
  .ctx('body')
  .handle(async (ctx) => {
    try {
      const balance = await BalanceService.findOne(ctx.body.balanceId);

      if (ctx.body.balanceTransactionCategoryId) {
        const balanceTransactionCategoryExists =
          await BalanceTransactionCategoryService.exists(
            ctx.body.balanceTransactionCategoryId
          );

        if (!balanceTransactionCategoryExists) {
          throw new BadRequestException(
            {},
            'balance-transaction.validation.balance-transaction-category-not-found'
          );
        }
      }

      if (
        MathHelper.isNegative(ctx.body.amount) &&
        MathHelper.toAbsolute(ctx.body.amount) > balance.amount
      ) {
        throw new BadRequestException(
          {},
          'balance-transaction.validation.reducing-amount-to-large'
        );
      }

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
