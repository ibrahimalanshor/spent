const {
  exceptions: { NotFoundException, BadRequestException },
} = require('@ibrahimalanshor/tabri');
const Controller = require('../../../lib/controller/controller.js');
const ExpenseService = require('./expense.service.js');
const BalanceService = require('../balance/balance.service.js');
const ExpenseCategoryService = require('../expense-category/expense-category.service.js');

exports.getAll = new Controller()
  .get()
  .ctx('query')
  .handle(async (ctx) => await ExpenseService.getAll(ctx.query));

exports.create = new Controller()
  .post()
  .ctx('body')
  .handle(async (ctx) => {
    try {
      const balance = await BalanceService.findOne(ctx.body.balanceId);
      const expenseCategory = await ExpenseCategoryService.findOne(
        ctx.body.expenseCategoryId
      );

      if (ctx.body.amount > balance.amount) {
        throw new BadRequestException(
          {},
          'expense.validation.amount-too-large'
        );
      }

      return await ExpenseService.create(ctx.body, {
        balance,
        expenseCategory,
      });
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new BadRequestException(
          {},
          'expense.validation.balance-category-not-found'
        );
      }

      throw err;
    }
  });
