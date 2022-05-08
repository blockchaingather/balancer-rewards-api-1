import * as express from 'express';

import { validationResult, ValidationChain } from 'express-validator';

// sequential processing, stops running validations chain if the previous one have failed.
const validator = (validations: ValidationChain[]) => {
    return async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (result.throw.length) break;
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        const errorMsg = errors.array();
        res.status(400).json({
            success: false,
            result: errorMsg[0].param + ': ' + errorMsg[0].msg
        });
    };
};

export default validator;
