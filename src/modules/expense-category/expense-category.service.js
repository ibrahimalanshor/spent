const ExpenseCategoryQuery = require('./expense-category.query.js');
const ExpenseCategoryModel = require('./model/expense-category.model.js');

exports.getAll = async function getAll(query) {
  const docs = await new ExpenseCategoryQuery()
    .search('name', query.name)
    .sort(query.sort)
    .paginate({
      page: query.page,
      limit: query.limit || 10,
    });
  const count = await new ExpenseCategoryQuery()
    .search('name', query.name)
    .count();

  return { count, docs };
};

exports.findOne = async function findOne(id) {
  return await new ExpenseCategoryQuery().findByIdOrFail(id);
};

exports.create = async function create(body) {
  return await ExpenseCategoryModel.create(body);
};

exports.update = async function update(expenseCategory, body) {
  return await ExpenseCategoryModel.updateOne(expenseCategory, body);
};

exports.remove = async function remove(expenseCategory) {
  return await ExpenseCategoryModel.deleteOne(expenseCategory);
};
