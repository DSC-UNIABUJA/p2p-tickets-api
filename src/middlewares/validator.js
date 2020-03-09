const {validationResult} = require('express-validator');

const validatorMiddleware = {};

/**
 * For validating the inputs
 * @param {Array<ValidationChain>} validations
 */
validatorMiddleware.inputs = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({success: false, errors: errors.array()});
  };
};

module.exports = validatorMiddleware;
