const { model } = require('mongoose');
const ExpendCategorySchema = require('./expense-category.schema.js');

module.exports = model('expoense-category', ExpendCategorySchema);
