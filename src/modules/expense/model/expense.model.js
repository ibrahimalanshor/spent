const { model } = require('mongoose');
const ExpenseSchema = require('./expense.schema.js');

module.exports = model('expense', ExpenseSchema);
