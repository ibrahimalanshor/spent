const { extendPrototype } = require('../../helpers/object.helper.js');
const Query = require('../../../lib/query/query.js');
const ExpenseCategoryModel = require('./model/expense-category.model.js');

function ExpenseCategoryQuery() {
  Query.call(this, ExpenseCategoryModel);
}

extendPrototype(ExpenseCategoryQuery, Query);

module.exports = ExpenseCategoryQuery;
