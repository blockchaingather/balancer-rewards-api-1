import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { jwt_secret } from '../config';
import constants from '../constant/constants';
const router = express.Router();

router.get('/getToken', async function (req, res, next) {
    const token = jwt.sign({ app: 'rewards' }, jwt_secret, {
        expiresIn: constants.JWT_TOKEN_EXPIRE
    });
    res.status(200).send({ token: token });
});

export default router;
