const expressValidatorBody = require('express-validator');
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');

const auth = {};

/**
 * Generates jwt token
 * @param {string | object | Buffer} payload
 * @param {string | object | Buffer} key
 * @param {number} expiryTime  -  Time taken for token to expire in minutes
 * @returns {string} token
 */
auth.generateJwtToken = (payload, expiryTime) => {
  return jsonWebToken.sign(payload, process.env.JWT_TOKEN, {
    // Expires in 30 min
    expiresIn: 60 * expiryTime,
  });
};

/**
 *
 * @param {string} token  - jwt token to verify
 * @param {string} key
 * @returns {object | string} decoded data  if successful
 */
auth.verifyJwtToken = token => {
  return jsonWebToken.verify(token, process.env.JWT_TOKEN);
};

/**
 * Compares passwords and returns a boolean if correct
 * @param {string} password - password string
 * @param {string} encrypted - already encrypted password
 * @returns {boolean} true or false
 */

auth.comparePassword = async (password, encrypted) => {
  return bcrypt.compare(password, encrypted);
};

auth.body = expressValidatorBody.body;

module.exports = auth;
