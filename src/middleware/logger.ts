import * as express from 'express';
import logger from '../utils/logger';

const log = () => {
    return async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const start: number = new Date().getTime();
        let ms: number = new Date().getTime() - start;
        await next();
        try {
            ms = new Date().getTime() - start;
            logger.Response(req, res, {}, ms);
        } catch (error) {
            ms = new Date().getTime() - start;
            // 记录异常日志
            logger.Error(req, error as Error, ms);
        }
    };
};

export default log;
