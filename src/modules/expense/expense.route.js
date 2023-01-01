const {
  createRouter,
  createRequestValidator,
  createUpload,
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
  {
    path: '/expenses/:id',
    method: 'get',
    handler: ExpenseController.findOne,
  },
  {
    path: '/expenses/:id/proof',
    method: 'patch',
    handler: [
      createUpload(ExpenseRequest.uploadProof, 'expense.validation.proof'),
      ExpenseController.updateProof,
    ],
  },
]);
