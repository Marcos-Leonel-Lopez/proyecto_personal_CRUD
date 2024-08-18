/* eslint-disable indent */
import dotenv from 'dotenv';
import __dirname from '../utils.js';
import path from 'path';
// Instalar command

const pathEnviroment = path.join(__dirname, '../.env.development');

dotenv.config({ path: pathEnviroment });

const PORT = process.env.PORT;
const PERSISTENCE = process.env.PERSISTENCE;

export const config = {
    server: {
        port: PORT
    },
    persistence: {
        type: PERSISTENCE
    },
    sql: {
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DATABASE,
        port: process.env.SQL_PORT
    }
};
