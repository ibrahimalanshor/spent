const {
  createRouter,
  createRequestValidator,
} = require('@ibrahimalanshor/tabri');

const BalanceTransactionCategoryController = require('./balance-transaction-category.controller.js');
const BalanceTransactionCategoryRequest = require('./requests');

module.exports = createRouter([
  {
    path: '/balance-transaction-categories',
    method: 'get',
    handler: BalanceTransactionCategoryController.getAll,
  },
  {
    path: '/balance-transaction-categories',
    method: 'post',
    handler: [
      createRequestValidator(BalanceTransactionCategoryRequest.create),
      BalanceTransactionCategoryController.create,
    ],
  },
  {
    path: '/balance-transaction-categories/:id',
    method: 'get',
    handler: BalanceTransactionCategoryController.findOne,
  },
  {
    path: '/balance-transaction-categories/:id',
    method: 'patch',
    handler: [
      createRequestValidator(BalanceTransactionCategoryRequest.update),
      BalanceTransactionCategoryController.update,
    ],
  },
  {
    path: '/balance-transaction-categories/:id',
    method: 'delete',
    handler: BalanceTransactionCategoryController.remove,
  },
]);
