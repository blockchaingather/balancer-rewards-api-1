import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as path from 'path';

// loader config
import { port } from './config';

// import router
import liquidityRouter from './routers/liquidity-mining';
import lbpRouter from './routers/lbp-group';
import poolRouter from './routers/lbp-pool';
import jwtRouter from './routers/token-router';

// import middleware
import auth from './middleware/auth';
import errorHandler from './middleware/err-handle';
import notFound from './middleware/not-found';

// import mysql
import sequelize from './utils/sequelize';

// set up express app
const app = express();

// loader middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// loader auth
app.use(auth);

// loader mysql
sequelize.addModels([path.resolve(__dirname, `./models/`)]);

// loader router middleware
app.use('/liquidity-mining/v1', liquidityRouter);
app.use('/', lbpRouter);
app.use('/', poolRouter);
app.use('/', jwtRouter);

// error handle middleware
app.use(errorHandler);
app.use(notFound);

// start server
app.listen(port, () => {
    console.log(`BAL rewards estimation API started on port ${port}`);
});
