const { body } = require('express-validator');

module.exports = [
  body('name')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('validation.exists')
    .bail()
    .isString()
    .withMessage('validation.string')
    .bail(),
  body('type')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('validation.exists')
    .bail()
    .isString()
    .withMessage('validation.string')
    .bail()
    .isIn(['revenue', 'expense'])
    .withMessage('validation.invalid')
    .bail(),
];
