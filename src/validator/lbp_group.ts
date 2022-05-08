import { body } from 'express-validator';

import validator from '../middleware/validator';

const lbpGroup = {
    list: validator([
        body('title').isEmpty(),
        body('description').isEmpty(),
        body('image_url').isEmpty(),
        body('link').isEmpty(),
        body('seq').isNumeric()
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
