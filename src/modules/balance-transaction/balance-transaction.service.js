const { connection } = require('mongoose');
const BalanceTransactionQuery = require('./balance-transaction.query.js');
const BalanceTransactionModel = require('./model/balance-transaction.model.js');
const BalanceService = require('../balance/balance.service');

exports.getAll = async function getAll(query) {
  const docs = await new BalanceTransactionQuery()
    .whereObjectId('balanceId', query.balanceId, { throw: false })
    .where('createdAt', query.createdAt)
    .sort(query.sort)
    .paginate({
      page: query.page,
      limit: query.limit || 10,
    });
  const count = await new BalanceTransactionQuery()
    .whereObjectId('balanceId', query.balanceId, { throw: false })
    .where('createdAt', query.createdAt)
    .count();

  return { count, docs };
};

exports.create = async function create(body, { balance }) {
  const session = await connection.startSession();

  try {
    await session.startTransaction();

    const balanceTransaction = await BalanceTransactionModel.create([body], {
      session,
    });

    await BalanceService.updateAmount(balance, body.amount, { session });

    await session.commitTransaction();

    return balanceTransaction[0];
  } catch (err) {
    await session.abortTransaction();

    throw err;
  } finally {
    session.endSession();
  }
};
