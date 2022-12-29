const { body } = require('express-validator');

module.exports = [
  body('balanceId')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('validation.exists')
    .bail()
    .isMongoId()
    .withMessage('validation.mongoid')
    .bail(),
  body('amount')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('validation.exists')
    .bail()
    .isInt()
    .withMessage('balance-transaction.validation.amount')
    .bail()
    .custom((val) => {
      if (val == 0) throw new Error('balance-transaction.validation.amount');

      return true;
    })
    .toInt(),
  body('description')
    .optional({ checkFalsy: true, nullable: true })
    .bail()
    .isString()
    .withMessage('validation.string')
    .bail(),
];
