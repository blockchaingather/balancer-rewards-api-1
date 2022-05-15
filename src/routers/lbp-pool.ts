import * as express from 'express';
import pool from '../handle/lbp-pool';
import lbpPool from '../validator/lbp_pool';
const router = express.Router();

// pool list
router.get('/pools', lbpPool.list, async function (req, res, next) {
    await pool.list(req, res);
});

// pool create
router.post(
    '/pool/create',
    lbpPool.create,
    async (req: express.Request, res: express.Response) => {
        await pool.create(req, res);
    }
);

// pool detail
router.get('/pool/:pool_id', lbpPool.detail, async (req, res) => {
    await pool.detail(req, res);
});

export default router;
