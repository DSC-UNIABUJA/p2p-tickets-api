const logger = require('../util/logger');
const authUtil = require('../util/auth');
const ModelAdapter = require('../Model/Adapter');
const User = require('../Model/User');

const authenticatorMiddleware = {};

/**
 *
 * @param {require('express').Request} req
 * @param {require('express').Response} res
 * @param {require('express').NextFunction} res
 */

authenticatorMiddleware.jwt = async (req, res, next) => {
  // Extract header
  let authorization = req.headers.authorization || '';
  authorization = authorization.replace('Bearer ', '');
  if (authorization == null) {
    return res.status(401).json({
      success: false,
      message: 'User is not authorized',
    });
  }
  try {
    const decode = authUtil.verifyJwtToken(authorization, process.env.JWT_KEY);
    req.id = decode.id;
    next();
  } catch (error) {
    logger.error(error);
    return res.status(401).json({
      success: false,
      message: 'User not authorized',
    });
  }
};

authenticatorMiddleware.hydrateUser = async (req, res, next) => {
  try {
    const model = new ModelAdapter(User);
    req.user = await model.find({id: req.id});
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticatorMiddleware;
