const BalanceTransactionQuery = require('./balance-transaction.query.js');

exports.getAll = async function getAll(query) {
  const docs = await new BalanceTransactionQuery().paginate({
    page: query.page,
    limit: query.limit,
  });
  const count = await new BalanceTransactionQuery().count();

  return { count, docs };
};
