import * as express from 'express';

// handle error
export default function errorHandler(
    err: express.Errback,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    console.log('errorHandler enter');
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    return res.render('error', { error: err });
}
