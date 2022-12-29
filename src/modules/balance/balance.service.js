const BalanceQuery = require('./balance.query.js');
const BalanceModel = require('./model/balance.model.js');

exports.getAll = async function getAll(query) {
  const docs = await new BalanceQuery().paginate({
    page: query.page,
    limit: query.limit,
  });
  const count = await new BalanceQuery().count();

  return { count, docs };
};

exports.findOne = async function findOne(id) {
  return await new BalanceQuery().findByIdOrFail(id);
};

exports.updateAmount = async function addBalance(balance, amount, { session }) {
  return await BalanceModel.updateOne(
    balance,
    {
      $inc: { amount },
    },
    { session }
  );
};
