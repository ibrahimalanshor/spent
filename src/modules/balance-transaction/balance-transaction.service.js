const { connection } = require('mongoose');
const BalanceTransactionQuery = require('./balance-transaction.query.js');
const BalanceTransactionModel = require('./model/balance-transaction.model.js');
const BalanceService = require('../balance/balance.service');
const MathHelper = require('../../helpers/math.helper.js');

exports.getAll = async function getAll(query) {
  const docs = await new BalanceTransactionQuery()
    .whereObjectId('balanceId', query.balanceId, { throw: false })
    .where('createdAt', query.createdAt)
    .where('type', query.type)
    .sort(query.sort)
    .paginate({
      page: query.page,
      limit: query.limit || 10,
    });
  const count = await new BalanceTransactionQuery()
    .whereObjectId('balanceId', query.balanceId, { throw: false })
    .where('createdAt', query.createdAt)
    .where('type', query.type)
    .count();

  return { count, docs };
};

exports.findOne = async function findOne(id) {
  return await new BalanceTransactionQuery().findByIdOrFail(id);
};

exports.create = async function create(
  body,
  { balance, withTransaction = true, session }
) {
  if (withTransaction) {
    session = await connection.startSession();
  }

  try {
    if (withTransaction) {
      await session.startTransaction();
    }

    const balanceTransaction = await BalanceTransactionModel.create(
      [
        {
          balanceId: balance._id,
          type: MathHelper.isNegative(body.amount) ? 'outcome' : 'income',
          ...body,
        },
      ],
      {
        session,
      }
    );

    await BalanceService.updateAmount(balance, body.amount, { session });

    if (withTransaction) {
      await session.commitTransaction();
    }

    return balanceTransaction[0];
  } catch (err) {
    if (withTransaction) {
      await session.abortTransaction();
    }

    throw err;
  } finally {
    if (withTransaction) {
      session.endSession();
    }
  }
};
