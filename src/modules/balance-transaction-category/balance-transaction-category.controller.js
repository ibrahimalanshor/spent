const Controller = require('../../../lib/controller/controller.js');
const BalanceTransactionCategoryService = require('./balance-transaction-category.service.js');

exports.getAll = new Controller()
  .get()
  .ctx('query')
  .handle(
    async (ctx) => await BalanceTransactionCategoryService.getAll(ctx.query)
  );

exports.findOne = new Controller()
  .get()
  .ctx('params')
  .handle(
    async (ctx) =>
      await BalanceTransactionCategoryService.findOne(ctx.params.id)
  );

exports.create = new Controller()
  .post()
  .ctx('body')
  .handle(
    async (ctx) => await BalanceTransactionCategoryService.create(ctx.body)
  );

exports.update = new Controller()
  .patch()
  .ctx('params', 'body')
  .handle(async (ctx) => {
    const balanceTransactionCategory =
      await BalanceTransactionCategoryService.findOne(ctx.params.id);

    await BalanceTransactionCategoryService.update(
      balanceTransactionCategory,
      ctx.body
    );

    return balanceTransactionCategory;
  });

exports.remove = new Controller()
  .delete()
  .ctx('params', 'body')
  .handle(async (ctx) => {
    const balanceTransactionCategory =
      await BalanceTransactionCategoryService.findOne(ctx.params.id);

    await BalanceTransactionCategoryService.remove(
      balanceTransactionCategory,
      ctx.body
    );

    return balanceTransactionCategory;
  });
