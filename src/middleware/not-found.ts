import * as express from 'express';

// handle error
export default function NotFound(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    console.log('NotFound enter');
    return res.status(404).json({
        success: false,
        result: 'router not found'
    });
}
