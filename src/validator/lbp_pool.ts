import { body, param, query } from 'express-validator';

import validator from '../middleware/validator';

const lbpPool = {
    list: validator([
        query('group_id')
            .notEmpty()
            .isInt({ gt: 0 })
            .withMessage('must be greater than 0')
    ]),
    create: validator([
        body('group_id')
            .notEmpty()
            .isInt({ gt: 0 })
            .withMessage('must be greater than 0'),
        body('network_id')
            .notEmpty()
            .isInt({ gt: 0 })
            .withMessage('must be greater than 0'),
        body('lbp_name')
            .notEmpty()
            .isLength({ min: 3 })
            .withMessage('At least three bit string'),
        body('lbp_symbol')
            .notEmpty()
            .isLength({ min: 2 })
            .withMessage('At least two bit string'),
        body('main_token').notEmpty().isString().isLength({ min: 32 }),
        body('base_token').notEmpty().isString().isLength({ min: 32 }),
        body('image_url').notEmpty().isURL().withMessage('must be a URL'),
        body('description').notEmpty().withMessage('cannot be empty'),
        body('price').notEmpty().isString(),
        body('swap_fee').notEmpty().isString(),
        body('learn_more_url').notEmpty().isURL().withMessage('must be a URL'),
        body('start_time')
            .isInt()
            .isInt({ gt: 9 })
            .withMessage('must be timestamp'),
        body('end_time')
            .isInt()
            .isInt({ gt: 9 })
            .withMessage('must be timestamp'),
        body('owner_address').notEmpty().isString().isLength({
            min: 42
        }),
        body('pool_address').notEmpty().isString().isLength({
            min: 42
        }),
        body('blocked_countries').notEmpty().isArray().isLength({ min: 1 }),
        body('lbp_creation_tx').notEmpty().isString().isLength({
            min: 42
        })
    ]),

    detail: validator([
        param('id')
            .notEmpty()
            .isInt({ gt: 0 })
            .withMessage('must be greater than 0')
    ])
};

export default lbpPool;
