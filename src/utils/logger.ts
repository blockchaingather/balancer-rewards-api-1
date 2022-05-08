import * as log4js from 'log4js';
import * as express from 'express';
// root dir
const baseLogPath = './logs';

// error log
const errorPath = '/error';
const errorFileName = 'error';
const errorLogPath = baseLogPath + errorPath + '/' + errorFileName;

// request log
const reqPath = '/request';
const reqFileName = 'request';
const reqLogPath = baseLogPath + reqPath + '/' + reqFileName;

// response log
const responsePath = '/response';
const responseFileName = 'response';
const responseLogPath = baseLogPath + responsePath + '/' + responseFileName;

// log config
const logConfig = {
    appenders: {
        console: {
            type: 'console'
        },
        errorLogger: {
            type: 'dateFile',
            filename: errorLogPath,
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            encoding: 'utf-8',
            maxLogSize: 10 * 1024 * 1024,
            // numBackups: 3,
            path: errorPath,
            layout: {
                type: 'basic'
            }
        },
        http: {
            type: 'dateFile',
            filename: reqLogPath,
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            encoding: 'utf-8',
            maxLogSize: 10 * 1024 * 1024,
            // numBackups: 3,
            path: reqPath,
            layout: {
                type: 'basic' // 'messagePassThrough'
            }
        },
        resLogger: {
            type: 'dateFile',
            filename: responseLogPath,
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            encoding: 'utf-8',
            maxLogSize: 10 * 1024 * 1024,
            // numBackups: 3,
            path: responsePath,
            layout: {
                type: 'basic'
            }
        }
    },
    categories: {
        default: {
            appenders: ['console'],
            level: 'all'
        },
        resLogger: {
            appenders: ['resLogger'],
            level: 'info'
        },
        errorLogger: {
            appenders: ['errorLogger'],
            level: 'error'
        },
        http: {
            appenders: ['http'],
            level: 'info'
        }
    },
    baseLogPath,
    replaceConsole: true
};

// loader log config
log4js.configure(logConfig);

const resLogger = log4js.getLogger('resLogger');
const reqLogger = log4js.getLogger('http');
const errorLogger = log4js.getLogger('errorLogger');
const consoleLogger = log4js.getLogger('console');

const Env = process.env.NODE_ENV || 'development';
consoleLogger.level = 'INFO';
if (Env == 'development') {
    consoleLogger.level = 'DEBUG';
}

// logger methods
const logger = {
    Error: function (req: express.Request, error: Error, resTime: number) {
        if (req && error) {
            errorLogger.error(formatError(req, error, resTime));
        }
    },

    Request: function (req: express.Request, resTime: number) {
        if (req) {
            reqLogger.info(formatReqLog(req, resTime));
        }
    },

    Response: function (
        req: express.Request,
        res: express.Response,
        data: Object,
        resTime: number
    ) {
        if (res) {
            resLogger.info(formatRes(req, res, data, resTime));
        }
    },

    Info: function (info: any) {
        if (info) {
            consoleLogger.info(formatInfo(info));
        }
    },
    Warn: function (info: any) {
        if (info) {
            consoleLogger.warn(info);
        }
    },
    Debug: function (info: any) {
        if (info) {
            consoleLogger.debug(info);
        }
    }
};

const formatInfo = function (info: any): string {
    let logText = '';
    logText += '\n' + '***************info log start ***************' + '\n';

    logText += 'info detail: ' + '\n' + JSON.stringify(info) + '\n';

    logText += '*************** info log end ***************' + '\n';

    return logText;
};

const formatRes = function (
    req: express.Request,
    res: express.Response,
    data: Object,
    resTime: number
): string {
    let logText = '';
    logText +=
        '\n' + '*************** response log start ***************' + '\n';

    logText += formatReqLog(req, resTime);

    logText += 'response status: ' + res.statusCode + '\n';

    logText +=
        'response header: ' + '\n' + JSON.stringify(res.getHeaders()) + '\n';

    logText += 'response body: ' + '\n' + JSON.stringify(data) + '\n';

    logText += '*************** response log end ***************' + '\n';

    return logText;
};

const formatError = function (
    req: express.Request,
    err: Error,
    resTime: number
): string {
    let logText = '';
    logText += '\n' + '*************** error log start ***************' + '\n';

    logText += formatReqLog(req, resTime);
    logText += 'err name: ' + err.name + '\n';
    logText += 'err message: ' + err.message + '\n';
    logText += 'err stack: ' + err.stack + '\n';

    logText += '*************** error log end ***************' + '\n';

    return logText;
};

const formatReqLog = function (req: express.Request, resTime: number): string {
    let logText = '';

    let method = req.method;
    logText += '\n' + 'request method: ' + method + '\n';

    logText += 'request originalUrl:  ' + req.originalUrl + '\n';

    logText += 'request client ip:  ' + req.ip + '\n';

    logText += 'request header: ' + '\n' + JSON.stringify(req.headers) + '\n';

    if (method === 'GET') {
        logText += 'request query:  ' + JSON.stringify(req.query) + '\n';
    } else {
        logText += 'request body: ' + '\n' + JSON.stringify(req.body) + '\n';
    }

    logText += 'response time(ms): ' + (new Date().getTime() - resTime) + '\n';

    return logText;
};

export default logger;
