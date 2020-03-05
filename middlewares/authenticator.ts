import {NextFunction, Request, Response} from 'express';
import logger from '../util/logger';
import * as authUtil from '../util/auth';
import ModelAdapter from '../Model/Adapter';
import User from '../Model/User';

export const jwt = async (req: Request, res: Response, next: NextFunction) => {
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
        const decode = authUtil.verifyJwtToken(authorization, process.env.JWT_KEY as string) as any;
        (req as any).id = decode.id;
        next();
    } catch (error) {
        logger.error(error);
        return res.status(401).json({
            success: false,
            message: 'User not authorized',
        });
    }
};

export const hydrateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const model = new ModelAdapter(User);
        (req as any).user = await model.find({id: (req as any).id});
        next();
    } catch (err) {
        next(err);
    }
};
