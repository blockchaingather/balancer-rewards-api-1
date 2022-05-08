import * as express from 'express';
import auth from '../middleware/auth';
import pool from '../handle/lbp-pool';
import lbpPool from '../validator/lbp_pool';
const router = express.Router();

// pool list
router.get('/pools', auth, lbpPool.list, async function (req, res, next) {
    await pool.list(req, res);
});

// pool create
router.post(
    '/pool/create',
    auth,
    lbpPool.create,
    async (req: express.Request, res: express.Response) => {
        await pool.create(req, res);
    }
);

// pool detail
router.get('/pool/:id', auth, lbpPool.detail, async (req, res) => {
    await pool.detail(req, res);
});

export default router;
