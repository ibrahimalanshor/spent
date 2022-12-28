const { extendPrototype } = require('../../helpers/object.helper.js');
const Query = require('../../../lib/query/query.js');
const BalanceModel = require('./model/balance.model.js');

function BalanceQuery() {
  Query.call(this, BalanceModel);
}

extendPrototype(BalanceQuery, Query);

module.exports = BalanceQuery;
