import * as express from 'express';
import constants from '../constant/constants';
import logger from '../utils/logger';
import LbpGroup from '../models/lbp-group';
import pagination from '../utils/pagination';

const lbp = {
    async list(req: express.Request, res: express.Response) {
        const reqTime = new Date().getTime();
        const [currentPage, pageSize] = await pagination(req);
        const response = {
            success: true,
            count: 0,
            result: []
        };
        try {
            const { count, rows } = await LbpGroup.findAndCountAll({
                attributes: [
                    'id',
                    'title',
                    'description',
                    'image_url',
                    'link',
                    'seq'
                ],
                where: {
                    deleted: constants.NOT_DELETED
                },
                raw: true,
                offset: (currentPage - 1) * pageSize,
                limit: pageSize
            });
            // console.log('lbp->list->rows:', rows);
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
        // receive body data
        const title: string = req?.body?.title;
        const description: string = req?.body?.description;
        const image_url: string = req?.body?.image_url;
        const link: string = req?.body?.link;
        const seq: number = req?.body?.seq || 1;

        // check data exists
        const lbpGroupResult = await LbpGroup.findOne({
            where: { title: title, deleted: constants.NOT_DELETED }
        });
        console.log('lbpGroupResult:', lbpGroupResult?.get());
        if (lbpGroupResult !== null) {
            return res.status(500).send({
                success: false,
                result: 'data already exists'
            });
        }

        // insert data
        const result = await LbpGroup.build();
        const dataField = {
            title,
            description,
            image_url,
            link,
            seq
        };
        result.set(dataField);
        const results = await result.save();
        // console.log('lbp->create->results:', results.get());
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
        return res.status(200).send(response);
    },

    async update(req: express.Request, res: express.Response) {
        const reqTime = new Date().getTime();

        // receive params
        const id = Number(req?.params?.id);

        // receive body data
        const title: string = req?.body?.title;
        const description: string = req?.body?.description;
        const image_url: string = req?.body?.image_url;
        const link: string = req?.body?.link;
        const seq: number = req?.body?.seq;
        const deleted: number = req?.body?.deleted;

        // check data exists and update data
        const results = await LbpGroup.findOne({ where: { id } })
            .then((lbpGroup) => {
                const lbpGroupObj = lbpGroup as LbpGroup;
                lbpGroupObj.title = title;
                lbpGroupObj.description = description;
                lbpGroupObj.image_url = image_url;
                lbpGroupObj.link = link;
                lbpGroupObj.seq = seq;
                lbpGroupObj.deleted = deleted;
                return lbpGroupObj.save();
            })
            .catch(function (err) {
                console.log('lbp update err:', err);
            });

        //no data found
        if (results === undefined) {
            return res.status(500).send({
                success: false,
                result: 'no data found'
            });
        }
        // console.log('lbp->update->results:', results.get());
        // response data
        const response = {
            success: true,
            result: results.get()
        };
        logger.Response(req, res, response, reqTime);
        return res.status(200).send(response);
    }
};

export default lbp;
