const expressValidatorBody = require('express-validator');
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');

/**
 * Generates jwt token
 * @param {string | object | Buffer} payload
 * @param {string | object | Buffer} key
 * @param {number} expiryTime  -  Time taken for token to expire in minutes
 * @returns {string} token
 */
export const generateJwtToken = (payload, key, expiryTime) => {
  return jsonWebToken.sign(payload, key, {
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
export const verifyJwtToken = (token, key) => {
  return jsonWebToken.verify(token, key);
};

/**
 * Compares passwords and returns a boolean if correct
 * @param {string} password - password string
 * @param {string} encrypted - already encrypted password
 * @returns {boolean} true or false
 */

export const comparePassword = async (password, encrypted) => {
  return bcrypt.compare(password, encrypted);
};

export const body = expressValidatorBody.body;
