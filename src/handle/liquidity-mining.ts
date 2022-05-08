import * as express from 'express';

import dbClient from '../utils/mysql';

// get user reward
const getUserReward = async function (address: string) {
    const sql = `select id, user_address as address, chain_id, token_address, current_estimate, velocity,week,snapshot_timestamp from every_week_need_reward_user_snapshot where lower(user_address) = '${address}'`;

    console.log('[liquidity-provider-multitoken] sql:', sql);

    const [results] = await dbClient.execute(sql, [address]);

    return results;
};

const liquidity = {
    async gas(req: express.Request, res: express.Response) {
        // response data
        return res.status(200).send({
            success: true,
            result: 80549.26751312907
        });
    },
    async providers(req: express.Request, res: express.Response) {
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
    }
};

export default liquidity;
