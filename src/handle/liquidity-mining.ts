import * as express from 'express';

import LiquidityMining from '../models/liquidity-mining';

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

            const results = await LiquidityMining.findAll({
                where: {
                    user_address: address.toLowerCase()
                }
            });
            const response = {
                success: true,
                result: {
                    current_timestamp: requestedAt,
                    'liquidity-providers': results
                }
            };
            return res.status(200).send(response);
        } catch (err) {
            console.log('liquidity->providers err:', err);
            return res.status(500).send({
                success: false,
                result: 'no liquidity providers were found'
            });
        }
    }
};

export default liquidity;
