import * as dotenv from 'dotenv';
// loader environment variable
const ENV = process.env.NODE_ENV || 'development';
const filePathEnv = './.env.' + ENV;
dotenv.config({ path: filePathEnv });

export const dbConfig = {
    HOST: process.env.MYSQL_HOST,
    USER: process.env.MYSQL_USER,
    PASSWORD: process.env.MYSQL_PASSWORD,
    DATABASE: process.env.MYSQL_DATABASE
};

export const PORT = process.env.PORT;
