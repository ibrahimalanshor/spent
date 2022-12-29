const { Schema } = require('mongoose');

const ExpenseCategorySchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

module.exports = ExpenseCategorySchema;
