const {
  createRouter,
  createRequestValidator,
} = require('@ibrahimalanshor/tabri');

const ExpenseCategoryController = require('./expense-category.controller.js');
const ExpenseCategoryRequest = require('./requests');

module.exports = createRouter([
  {
    path: '/expense-categories',
    method: 'get',
    handler: ExpenseCategoryController.getAll,
  },
  {
    path: '/expense-categories',
    method: 'post',
    handler: [
      createRequestValidator(ExpenseCategoryRequest.create),
      ExpenseCategoryController.create,
    ],
  },
  {
    path: '/expense-categories/:id',
    method: 'get',
    handler: ExpenseCategoryController.findOne,
  },
  {
    path: '/expense-categories/:id',
    method: 'patch',
    handler: [
      createRequestValidator(ExpenseCategoryRequest.update),
      ExpenseCategoryController.update,
    ],
  },
  {
    path: '/expense-categories/:id',
    method: 'delete',
    handler: ExpenseCategoryController.remove,
  },
]);
