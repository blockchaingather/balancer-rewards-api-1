import * as express from 'express';
import { verify } from 'jsonwebtoken';
import { jwt_secret } from '../config';

const allowList = ['/getToken', '/liquidity-mining/v1'];

const auth = function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    console.log('enter auth middleware');
    // filter allow list
    const filterResult = allowList.map((val) => req.url.startsWith(val));
    console.log('filterResult:', filterResult);
    if (filterResult.includes(true)) {
        return next();
    }
    const token = req.headers['token'];
    if (!token) {
        return res.status(401).send({
            success: false,
            result: 'invalid token'
        });
    }
    try {
        const decodeToken = verify(token as string, jwt_secret);
        console.log('auth -> decodeToken:', decodeToken);
        next();
    } catch (err) {
        return res.status(401).send({
            success: false,
            result: 'auth failed'
        });
    }
};

export default auth;
