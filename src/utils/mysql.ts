import * as Config from '../config';
import * as mysql from 'mysql2/promise';

// create mysql pool
const dbClient = mysql.createPool({
    host: Config.dbConfig.HOST,
    user: Config.dbConfig.USER,
    password: Config.dbConfig.PASSWORD,
    database: Config.dbConfig.DATABASE
});

export default dbClient;
