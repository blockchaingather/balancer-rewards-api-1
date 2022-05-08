import * as express from 'express';
import liquidity from '../handle/liquidity-mining';

const router = express.Router();

router.get('/gas', async function (req, res, next) {
    await liquidity.gas(req, res);
});

// get iquidity provider by user address
router.get('/liquidity-provider-multitoken/:id', async (req, res) => {
    await liquidity.providers(req, res);
});

export default router;
