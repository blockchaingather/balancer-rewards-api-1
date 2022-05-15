import { body, query } from 'express-validator';

import validator from '../middleware/validator';

const lbpGroup = {
    list: validator([
        query('current_page')
            .optional()
            .notEmpty()
            .withMessage('can not empty')
            .isInt({
                gt: 0
            })
            .withMessage('must be greater than 0'),
        query('page_size')
            .optional()
            .notEmpty()
            .withMessage('can not empty')
            .isInt({
                gt: 0
            })
            .withMessage('must be greater than 0')
    ]),
    create: validator([
        body('title').notEmpty(),
        body('description').notEmpty(),
        body('image_url').notEmpty().isURL(),
        body('link').notEmpty().isURL(),
        body('seq').isNumeric()
    ]),
    update: validator([
        body('title').notEmpty(),
        body('description').notEmpty(),
        body('image_url').notEmpty().isURL(),
        body('link').notEmpty().isURL(),
        body('seq').notEmpty()
    ])
};

export default lbpGroup;
