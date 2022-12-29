const {
  createRouter,
  createRequestValidator,
} = require('@ibrahimalanshor/tabri');

const ExpenseController = require('./expense.controller.js');
const ExpenseRequest = require('./requests');

module.exports = createRouter([
  {
    path: '/expenses',
    method: 'get',
    handler: ExpenseController.getAll,
  },
  {
    path: '/expenses',
    method: 'post',
    handler: [
      createRequestValidator(ExpenseRequest.create),
      ExpenseController.create,
    ],
  },
]);
