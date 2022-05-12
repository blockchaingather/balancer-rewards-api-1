import * as express from 'express';
import dbClient from '../utils/mysql';
import * as mysql from 'mysql2';
import constants from '../constant/constants';
import logger from '../utils/logger';

const pool = {
    async list(req: express.Request, res: express.Response) {
        const reqTime = new Date().getTime();
        // receive body data
        const group_id = req?.query?.group_id;
        // query results
        const sql = `SELECT id, lbp_name, price, start_time, end_time, network_id, image_url FROM lbp_pool WHERE deleted=${constants.NOT_DELETED} and group_id=${group_id}`;
        console.log('[pool->list] sql:', sql);
        const [results] = await dbClient.execute(sql, [constants.NOT_DELETED]);
        const response = {
            success: true,
            result: results
        };
        logger.Response(req, res, response, reqTime);
        // response data
        return res.status(200).send(response);
    },

    async create(req: express.Request, res: express.Response) {
        const reqTime = new Date().getTime();
        // receive body data
        const group_id = req?.body?.group_id;
        const network_id = req?.body?.network_id;
        const lbp_name = req?.body?.lbp_name;
        const lbp_symbol = req?.body?.lbp_symbol;
        const main_token = req?.body?.main_token;
        const base_token = req?.body?.base_token;
        const image_url = req?.body?.image_url;
        const description = req?.body?.description;
        const price = req?.body?.price;
        const learn_more_url = req?.body?.learn_more_url;
        const swap_fee = req?.body?.swap_fee;
        const start_time = req?.body?.start_time;
        const end_time = req?.body?.end_time;
        const owner_address = req?.body?.owner_address;
        const pool_id = req?.body?.pool_id;
        const pool_address = req?.body?.pool_address;
        const blocked_countries = req?.body?.blocked_countries;
        const lbp_creation_tx = req?.body?.lbp_creation_tx;
        // check group_id
        const querySQL = `SELECT * FROM lbp_group WHERE deleted=${constants.NOT_DELETED} and id=${group_id}`;
        console.log('[pool->detail] querySQL:', querySQL);
        const [queryResults] = await dbClient.execute(querySQL);
        console.log('pool-> queryResults:', queryResults);
        const queryResult = queryResults as mysql.RowDataPacket[];
        if (queryResult.length == 0) {
            return res.status(500).send({
                success: false,
                result: 'group_id no found'
            });
        }
        // check data exists
        const querySQL1 = `SELECT * FROM lbp_pool WHERE deleted=${constants.NOT_DELETED} and group_id='${group_id}' and pool_address='${pool_address}' and network_id=${network_id}`;
        console.log('[lbp->create] querySQL1:', querySQL1);
        const [queryResults1] = await dbClient.execute(querySQL1);
        console.log('pool-> queryResults:', queryResults);
        const queryResult1 = queryResults1 as mysql.RowDataPacket[];
        if (queryResult1.length > 0) {
            return res.status(500).send({
                success: false,
                result: 'data already exists'
            });
        }
        // insert data
        try {
            const sql = `INSERT INTO lbp_pool(group_id, network_id, 
                lbp_name, lbp_symbol, main_token,base_token,image_url,description,price,learn_more_url,swap_fee,start_time,end_time, owner_address, pool_id, pool_address, blocked_countries, lbp_creation_tx) 
                values(${group_id},${network_id},'${lbp_name}','${lbp_symbol}','${main_token}','${base_token}','${image_url}','${description}','${price}','${learn_more_url}','${swap_fee}',${start_time},${end_time},'${owner_address}', '${pool_id}', '${pool_address}','${blocked_countries}', '${lbp_creation_tx}')`;
            console.log('[pool->create] sql:', sql);
            const [results] = await dbClient.execute(sql);
            // type assert
            const result = results as mysql.ResultSetHeader;
            console.log('lbp->results:', result);
            // response data
            const response = {
                success: true,
                result: {
                    id: result.insertId,
                    group_id,
                    network_id,
                    lbp_name,
                    lbp_symbol,
                    main_token,
                    base_token,
                    image_url,
                    description,
                    price,
                    learn_more_url,
                    swap_fee,
                    start_time,
                    end_time,
                    owner_address,
                    pool_id,
                    pool_address,
                    blocked_countries,
                    lbp_creation_tx
                }
            };
            logger.Response(req, res, response, reqTime);
            // success response
            return res.status(200).send(response);
        } catch (err) {
            return res.status(200).send({
                success: false,
                result: err
            });
        }
    },

    async detail(req: express.Request, res: express.Response) {
        const reqTime = new Date().getTime();
        //  receive params
        const id = req?.params?.id;
        // query results
        const sql = `SELECT * FROM lbp_pool WHERE deleted=${constants.NOT_DELETED} and id=${id}`;
        console.log('[pool->detail] sql:', sql);
        const [results] = await dbClient.execute(sql);
        console.log('pool-> results:', results);
        const result = results as mysql.RowDataPacket[];
        logger.Response(req, res, result, reqTime);
        // response data
        if (result.length == 0) {
            return res.status(200).send({
                success: false,
                result: 'no data found'
            });
        }
        return res.status(200).send({
            success: true,
            result: result[0]
        });
    }
};

export default pool;
