import * as express from 'express';
import lbp from '../handle/lbp-group';
import lbpGroup from '../validator/lbp_group';
// import auth from '../middleware/auth';
const router = express.Router();

// lbps group list
router.get('/lbps', lbpGroup.list, async function (req, res, next) {
    await lbp.list(req, res);
});

// lbps group create
router.post('/lbp/group/create', lbpGroup.create, async (req, res) => {
    await lbp.create(req, res);
});

// lbps group update by id
router.post('/lbp/group/update/:id', lbpGroup.update, async (req, res) => {
    await lbp.update(req, res);
});

export default router;
