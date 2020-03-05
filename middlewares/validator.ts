import {ValidationChain, validationResult} from 'express-validator';
import {NextFunction, Request, Response} from 'express';

/*
    For validating the inputs
 */
export const inputs = (validations: Array<ValidationChain>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({success: false, errors: errors.array()});
    };
};
