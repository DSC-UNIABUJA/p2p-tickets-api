import bcrypt from 'bcrypt';

import {body as expressValidatorBody} from 'express-validator';
import jsonWebToken from 'jsonwebtoken';

/**
 * Generates jwt token
 * @param payload
 * @param key
 * @param {number} expiryTime  -  Time taken for token to expire in minutes
 * @returns {string} token
 */
export const generateJwtToken = (
    payload: string | Buffer | object,
    key: string | Buffer,
    expiryTime: number,
): string => {
    return jsonWebToken.sign(payload, process.env.JWT_KEY as string, {
        // Expires in 30 min
        expiresIn: 60 * expiryTime,
    });
};

export const verifyJwtToken = (token: string, key: string) => {
    return jsonWebToken.verify(token, key) as any;
};

/**
 * Compares passwords and returns a boolean if correct
 * @param password - password string
 * @param encrypted - already encrypted password
 */
export const comparePassword = async (password: string, encrypted: string): Promise<boolean> => {
    return bcrypt.compare(password, encrypted);
};

export const body = expressValidatorBody;
