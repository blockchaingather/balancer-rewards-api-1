import * as express from 'express';
import constants from '../constant/constants';

const pagination = async function (req: express.Request) {
    const currentPage =
        Number(req?.query?.current_page) || constants.CURRENT_PAGE;
    const pageSize = Number(req?.query?.page_size) || constants.PAGE_SIZE;

    return [currentPage, pageSize];
};
export default pagination;
