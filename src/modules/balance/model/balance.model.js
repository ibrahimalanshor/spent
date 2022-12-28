const { model } = require('mongoose');
const BalanceSchema = require('./balance.schema.js');

module.exports = model('balance', BalanceSchema);
