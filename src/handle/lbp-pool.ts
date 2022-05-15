import * as express from 'express';
import constants from '../constant/constants';
import logger from '../utils/logger';
import LbpPool from '../models/lbp-pool';
import LbpGroup from '../models/lbp-group';
import pagination from '../utils/pagination';

const pool = {
    async list(req: express.Request, res: express.Response) {
        const reqTime = new Date().getTime();
        // pagination
        const [currentPage, pageSize] = await pagination(req);
        // receive body data
        const group_id = Number(req?.query?.group_id);
        let where = {
            deleted: constants.NOT_DELETED
        };
        if (group_id > 0) {
            Object.assign(where, {
                group_id: group_id
            });
        }
        const response = {
            success: true,
            count: 0,
            result: []
        };
        try {
            const { count, rows } = await LbpPool.findAndCountAll({
                attributes: [
                    'id',
                    'lbp_name',
                    'price',
                    'start_time',
                    'end_time',
                    'network_id',
                    'image_url'
                ],
                where: where,
                raw: true,
                offset: (currentPage - 1) * pageSize,
                limit: pageSize
            });
            // console.log('results:', rows);
            const response = {
                success: true,
                count,
                result: rows
            };
            logger.Response(req, res, response, reqTime);
            return res.status(200).send(response);
        } catch (err) {
            console.log('lbp->err:', err);
            return res.status(200).send(response);
        }
    },

    async create(req: express.Request, res: express.Response) {
        const reqTime = new Date().getTime();
        const body = req?.body;
        // receive body data
        const group_id = body?.group_id;
        const network_id = body?.network_id;
        const lbp_name = body?.lbp_name;
        const lbp_symbol = body?.lbp_symbol;
        const main_token = body?.main_token;
        const base_token = body?.base_token;
        const image_url = body?.image_url;
        const description = body?.description;
        const price = body?.price;
        const learn_more_url = body?.learn_more_url;
        const swap_fee = body?.swap_fee;
        const start_time = body?.start_time;
        const end_time = body?.end_time;
        const owner_address = body?.owner_address;
        const pool_id = body?.pool_id;
        const pool_address = body?.pool_address;
        const blocked_countries = body?.blocked_countries;
        const lbp_creation_tx = body?.lbp_creation_tx;

        // check group_id
        const lbpGroupResult = await LbpGroup.findOne({
            where: { id: group_id, deleted: constants.NOT_DELETED }
        });
        console.log('lbpGroupResult:', lbpGroupResult?.get());
        if (lbpGroupResult === null) {
            return res.status(500).send({
                success: false,
                result: 'group_id no found'
            });
        }

        // check data exists
        const lbpPoolResult = await LbpPool.findOne({
            where: { pool_id: pool_id, deleted: constants.NOT_DELETED }
        });
        console.log('lbpPoolResult:', lbpPoolResult?.get());
        if (lbpPoolResult !== null) {
            return res.status(500).send({
                success: false,
                result: 'data already exists'
            });
        }

        // insert data
        try {
            const result = await LbpPool.build();
            const dataField = {
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
            };

            dataField.blocked_countries = dataField.blocked_countries.join(',');
            result.set(dataField);
            const results = await result.save();
            // console.log('results:', results.get());
            // response data
            const response = {
                success: true,
                result: Object.assign(
                    {
                        id: results.id
                    },
                    dataField
                )
            };
            logger.Response(req, res, response, reqTime);
            // success response
            return res.status(200).send(response);
        } catch (err) {
            console.log('lbp-pool create err:', err);
            return res.status(500).send({
                success: false,
                result: 'create data failed'
            });
        }
    },

    async detail(req: express.Request, res: express.Response) {
        const reqTime = new Date().getTime();
        //  receive params
        const pool_id = req?.params?.pool_id;
        // check data exists
        const lbpPoolResult = await LbpPool.findOne({
            where: { pool_id: pool_id, deleted: constants.NOT_DELETED }
        });
        console.log('lbpPoolResult:', lbpPoolResult?.get());
        if (lbpPoolResult === null) {
            return res.status(500).send({
                success: false,
                result: 'no data found'
            });
        }

        logger.Response(req, res, lbpPoolResult?.get(), reqTime);
        // response data
        return res.status(200).send({
            success: true,
            result: lbpPoolResult?.get()
        });
    }
};

export default pool;
