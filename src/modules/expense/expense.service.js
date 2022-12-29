const { connection } = require('mongoose');
const ExpensQuery = require('./expense.query.js');
const ExpenseModel = require('./model/expense.model.js');
const BalanceService = require('../balance/balance.service');

exports.getAll = async function getAll(query) {
  const docs = await new ExpensQuery()
    .whereObjectId('balanceId', query.balanceId, { throw: false })
    .whereObjectId('expenseCategoryId', query.expenseCategoryId, {
      throw: false,
    })
    .where('createdAt', query.createdAt)
    .sort(query.sort)
    .paginate({
      page: query.page,
      limit: query.limit || 10,
    });
  const count = await new ExpensQuery()
    .whereObjectId('balanceId', query.balanceId, { throw: false })
    .whereObjectId('expenseCategoryId', query.expenseCategoryId, {
      throw: false,
    })
    .where('createdAt', query.createdAt)
    .count();

  return { count, docs };
};

exports.create = async function create(body, { balance }) {
  const session = await connection.startSession();

  try {
    await session.startTransaction();

    const expense = await ExpenseModel.create([body], {
      session,
    });

    await BalanceService.updateAmount(balance, -body.amount, { session });

    await session.commitTransaction();

    return expense[0];
  } catch (err) {
    await session.abortTransaction();

    throw err;
  } finally {
    session.endSession();
  }
};
