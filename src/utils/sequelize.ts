import { Sequelize } from 'sequelize-typescript';
import * as Config from '../config';

// loader mysql
const sequelize = new Sequelize(
    `mysql://${Config.dbConfig.USER}:${Config.dbConfig.PASSWORD}@${Config.dbConfig.HOST}:3306/${Config.dbConfig.DATABASE}`
);

export default sequelize;
