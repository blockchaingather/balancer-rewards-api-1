import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as Config from './config';
import * as cors from 'cors';
import * as mysql from 'mysql2/promise';

/**
 *  Set up express app
 */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const main = express();
main.use('/liquidity-mining/v1', app);
main.use(cors());
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

const DbClient = mysql.createPool({
    host: Config.dbConfig.HOST,
    user: Config.dbConfig.USER,
    password: Config.dbConfig.PASSWORD,
    database: Config.dbConfig.DATABASE
});

app.get('/gas', async (req, res) => {
    const response = {
        success: true,
        result: 80549.26751312907
    };
    return res.status(200).send(response);
});

// get iquidity provider by user address
app.get('/liquidity-provider-multitoken/:id', async (req, res) => {
    try {
        const address = req?.params?.id?.toLowerCase();

        if (!address) {
            throw new Error('must specify an address');
        }
        const requestedAt = new Date();

        const rows = await getUserReward(address);

        console.log(
            '[liquidity-provider-multitoken] typeof:%s, rows:',
            typeof rows,
            rows
        );
        const response = {
            success: true,
            result: {
                current_timestamp: requestedAt,
                'liquidity-providers': rows
            }
        };
        return res.status(200).send(response);
    } catch (err) {
        return res.status(400).send({ success: false, error: err });
    }
});

// get user reward
const getUserReward = async function (address: string) {
    const sql = `select id, user_address as address, chain_id, token_address, current_estimate, velocity,week,snapshot_timestamp from every_week_need_reward_user_snapshot where lower(user_address) = '${address}'`;

    console.log('[liquidity-provider-multitoken] sql:', sql);

    const [results] = await DbClient.execute(sql, [address]);

    return results;
};

const port = Config.PORT || 3000;
main.listen(port, () => {
    console.log(`BAL rewards estimation API started on port ${port}`);
});
