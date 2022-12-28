const BalanceQuery = require('./balance.query.js');

exports.getAll = async function getAll(query) {
  const docs = await new BalanceQuery().paginate({
    page: query.page,
    limit: query.limit,
  });
  const count = await new BalanceQuery().count();

  return { count, docs };
};
