import * as express from 'express';
import dbClient from '../utils/mysql';
import * as mysql from 'mysql2';
import constants from '../constant/constants';

import logger from '../utils/logger';

const lbp = {
    async list(req: express.Request, res: express.Response) {
        const reqTime = new Date().getTime();
        // query results
        const sql = `SELECT id, title, description, image_url, link FROM lbp_group WHERE deleted=${constants.NOT_DELETED}`;
        console.log('[lbp->list] sql:', sql);
        const [results] = await dbClient.execute(sql, [constants.NOT_DELETED]);
        console.log('lbp->list->results:', results);
        const response = {
            success: true,
            result: results
        };
        logger.Response(req, res, response, reqTime);
        return res.status(200).send(response);
    },

    async create(req: express.Request, res: express.Response) {
        const reqTime = new Date().getTime();
        // receive body data
        const title = req?.body?.title;
        const description = req?.body?.description;
        const image_url = req?.body?.image_url;
        const link = req?.body?.link;
        const seq = req?.body?.seq || 1;

        // check data exists
        const querySQL = `SELECT * FROM lbp_group WHERE deleted=${constants.NOT_DELETED} and title='${title}'`;
        console.log('[lbp->create] querySQL:', querySQL);
        const [queryResults] = await dbClient.execute(querySQL);
        console.log('pool-> queryResults:', queryResults);
        const queryResult = queryResults as mysql.RowDataPacket[];
        if (queryResult.length > 0) {
            return res.status(500).send({
                success: false,
                result: 'data already exists'
            });
        }

        // insert data
        const sql = `INSERT INTO lbp_group(title, description, image_url, link, seq) values('${title}', '${description}', '${image_url}', '${link}', ${seq})`;
        console.log('[lbp->create] sql:', sql);
        const [results] = await dbClient.execute(sql);

        // type assert
        const result = results as mysql.ResultSetHeader;
        console.log('lbp->results:', result);

        // response data
        const response = {
            success: true,
            result: {
                id: result.insertId,
                title,
                description,
                image_url,
                link,
                seq
            }
        };
        logger.Response(req, res, response, reqTime);
        return res.status(200).send(response);
    },

    async update(req: express.Request, res: express.Response) {
        const reqTime = new Date().getTime();
        // receive params
        const id = req?.params?.id;
        // receive body data
        const title = req?.body?.title;
        const description = req?.body?.description;
        const image_url = req?.body?.image_url;
        const link = req?.body?.link;
        const seq = req?.body?.seq;
        const deleted = req?.body?.deleted;
        // check data exists
        const querySQL = `SELECT * FROM lbp_group WHERE deleted=${constants.NOT_DELETED} and id=${id}`;
        console.log('[pool->detail] querySQL:', querySQL);
        const [queryResults] = await dbClient.execute(querySQL);
        console.log('pool-> queryResults:', queryResults);
        const queryResult = queryResults as mysql.RowDataPacket[];
        if (queryResult.length == 0) {
            return res.status(500).send({
                success: false,
                result: 'no data found'
            });
        }
        // update data
        const sql = `UPDATE lbp_group SET title='${title}', description='${description}', image_url='${image_url}', link='${link}', seq=${seq}, deleted=${deleted} WHERE id=${id}`;
        console.log('[lbp->create] sql:', sql);
        const [results] = await dbClient.execute(sql);
        console.log('lbp->results:', results);
        // response data
        const response = {
            success: true,
            result: {
                id,
                title,
                description,
                image_url,
                link,
                seq,
                deleted
            }
        };
        logger.Response(req, res, response, reqTime);
        return res.status(200).send(response);
    }
};

export default lbp;
