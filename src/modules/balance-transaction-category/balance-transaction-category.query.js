const { extendPrototype } = require('../../helpers/object.helper.js');
const Query = require('../../../lib/query/query.js');
const BalanceTransactionCategoryModel = require('./model/balance-transaction-category.model.js');

function BalanceTransactionCategoryQuery() {
  Query.call(this, BalanceTransactionCategoryModel);
}

extendPrototype(BalanceTransactionCategoryQuery, Query);

module.exports = BalanceTransactionCategoryQuery;
