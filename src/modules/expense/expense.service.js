const { connection } = require('mongoose');
const ExpensQuery = require('./expense.query.js');
const ExpenseModel = require('./model/expense.model.js');
const BalanceTransactionService = require('../balance-transaction/balance-transaction.service');

exports.getAll = async function getAll(query) {
  const docs = await new ExpensQuery()
    .whereObjectId('balanceId', query.balanceId, { throw: false })
    .whereObjectId('expenseCategoryId', query.expenseCategoryId, {
      throw: false,
    })
    .where('createdAt', query.createdAt)
    .with('expenseCategory')
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

exports.findOne = async function findOne(id) {
  return await new ExpensQuery().findByIdOrFail(id);
};

exports.create = async function create(body, { balance }) {
  const session = await connection.startSession();

  try {
    await session.startTransaction();

    const balanceTransaction = await BalanceTransactionService.create(
      {
        amount: -body.amount,
        description: body.description,
        type: 'expense',
      },
      {
        balance,
        session,
        withTransaction: false,
      }
    );
    const expense = await ExpenseModel.create(
      [
        {
          balanceId: balance._id,
          balanceTransactionId: balanceTransaction._id,
          ...body,
        },
      ],
      {
        session,
      }
    );

    await session.commitTransaction();

    return expense[0];
  } catch (err) {
    await session.abortTransaction();

    throw err;
  } finally {
    session.endSession();
  }
};

exports.updateProof = async function updateProof(expense, proof) {
  await expense.updateOne({ proof });

  return expense;
};
