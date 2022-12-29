const { extendPrototype } = require('../../helpers/object.helper.js');
const Query = require('../../../lib/query/query.js');
const ExpenseModel = require('./model/expense.model.js');

function ExpenseQuery() {
  Query.call(this, ExpenseModel);
}

extendPrototype(ExpenseQuery, Query);

module.exports = ExpenseQuery;
