const { extendPrototype } = require('../../helpers/object.helper.js');
const Query = require('../../../lib/query/query.js');
const BalanceTransactionModel = require('./model/balance-transaction.model.js');

function BalanceTransactionQuery() {
  Query.call(this, BalanceTransactionModel);
}

extendPrototype(BalanceTransactionQuery, Query);

module.exports = BalanceTransactionQuery;
