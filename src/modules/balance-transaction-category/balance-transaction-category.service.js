const BalanceTransactionCategoryQuery = require('./balance-transaction-category.query.js');
const BalanceTransactionCategoryModel = require('./model/balance-transaction-category.model.js');

exports.getAll = async function getAll(query) {
  const docs = await new BalanceTransactionCategoryQuery()
    .search('name', query.name)
    .sort(query.sort)
    .paginate({
      page: query.page,
      limit: query.limit || 10,
    });
  const count = await new BalanceTransactionCategoryQuery()
    .search('name', query.name)
    .count();

  return { count, docs };
};

exports.findOne = async function findOne(id) {
  return await new BalanceTransactionCategoryQuery().findByIdOrFail(id);
};

exports.create = async function create(body) {
  return await BalanceTransactionCategoryModel.create(body);
};

exports.update = async function update(balanceTransactionCategory, body) {
  return await BalanceTransactionCategoryModel.updateOne(
    balanceTransactionCategory,
    body
  );
};

exports.remove = async function remove(balanceTransactionCategory) {
  return await BalanceTransactionCategoryModel.deleteOne(
    balanceTransactionCategory
  );
};
