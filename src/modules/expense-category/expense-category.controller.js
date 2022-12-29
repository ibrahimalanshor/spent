const Controller = require('../../../lib/controller/controller.js');
const ExpenseCategoryService = require('./expense-category.service.js');

exports.getAll = new Controller()
  .get()
  .ctx('query')
  .handle(async (ctx) => await ExpenseCategoryService.getAll(ctx.query));

exports.findOne = new Controller()
  .get()
  .ctx('params')
  .handle(async (ctx) => await ExpenseCategoryService.findOne(ctx.params.id));

exports.create = new Controller()
  .post()
  .ctx('body')
  .handle(async (ctx) => await ExpenseCategoryService.create(ctx.body));

exports.update = new Controller()
  .patch()
  .ctx('params', 'body')
  .handle(async (ctx) => {
    const expenseCategory = await ExpenseCategoryService.findOne(ctx.params.id);

    await ExpenseCategoryService.update(expenseCategory, ctx.body);

    return expenseCategory;
  });

exports.remove = new Controller()
  .delete()
  .ctx('params', 'body')
  .handle(async (ctx) => {
    const expenseCategory = await ExpenseCategoryService.findOne(ctx.params.id);

    await ExpenseCategoryService.remove(expenseCategory, ctx.body);

    return expenseCategory;
  });
