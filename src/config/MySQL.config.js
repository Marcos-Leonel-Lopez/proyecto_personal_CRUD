/* eslint-disable indent */
import mysql from 'mysql2/promise';
import { config } from './config.js';

const { host, user, password, database, port } = config.sql;

class MySqlDBConnection {
    static #instance;
    static #connection;

    constructor () {
        if (!MySqlDBConnection.#connection) {
            MySqlDBConnection.#connection = mysql.createPool({
                host,
                user,
                port,
                password,
                database
            });
        }
    }

    static async getInstance () {
        if (MySqlDBConnection.#instance) {
            console.log('Ya estabas conectado!');
            return MySqlDBConnection.#instance;
        } else {
            this.#instance = new MySqlDBConnection();
            console.log('Ahora estás conectado');
            return this.#instance;
        }
    }

    static getConnection () {
        return MySqlDBConnection.#connection;
    }
}

export { MySqlDBConnection };
