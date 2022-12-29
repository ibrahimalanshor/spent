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
    .isInt({ min: 1 })
    .withMessage('balance-transaction.validation.amount')
    .bail()
    .toInt(),
  body('description')
    .optional({ checkFalsy: true, nullable: true })
    .bail()
    .isString()
    .withMessage('validation.string')
    .bail(),
];
