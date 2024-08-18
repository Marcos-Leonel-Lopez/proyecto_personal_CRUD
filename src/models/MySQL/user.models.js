/* eslint-disable indent */
// VALIDAR QUE LOS DATOS SEAN UNICOS EN CASO DE SER REQUERIDO, GARANTIZAR LA INTEGRIDAD DE LA BASE DE DATOS
import { randomUUID } from 'crypto';
import { timestampCreate } from '../../utils.js';
import { MySqlDBConnection } from '../../config/MySQL.config.js';

export class UserModel {
    static getAll = async ({ role }) => {
        try {
            let statusResult;
            const connection = MySqlDBConnection.getConnection();
            let query = 'SELECT * FROM users';
            const params = [];
            if (role) {
                if (Array.isArray(role)) {
                    query += ' WHERE LOWER(role) IN (?)';
                    params.push(role.map(r => r.toLowerCase()));
                } else {
                    query += ' WHERE LOWER(role) = ?';
                    params.push(role.toLowerCase());
                }
            }
            const [rows] = await connection.query(query, params);
            if (rows.length === 0) {
                statusResult = 204;
            } else {
                statusResult = 200;
            }
            return {
                status: statusResult,
                data: {
                    status: 'success',
                    success: true,
                    payload: rows
                }
            };
        } catch (error) {
            return {
                status: 500,
                data: {
                    status: 'error',
                    success: false,
                    message: error
                }
            };
        }
    };

    static getById = async ({ id }) => {
        try {
            const connection = MySqlDBConnection.getConnection();
            const query = 'SELECT * FROM users WHERE id = ?;';
            const params = [id];
            const [rows] = await connection.query(query, params);
            if (rows.length === 0) {
                return {
                    status: 404,
                    data: {
                        status: 'error',
                        success: false,
                        message: 'User not found'
                    }
                };
            }
            return {
                status: 200,
                data: {
                    status: 'success',
                    success: true,
                    payload: rows
                }
            };
        } catch (error) {
            return {
                status: 500,
                data: {
                    status: 'error',
                    success: false,
                    message: error
                }
            };
        }
    };

    static create = async ({ data }) => {
        try {
            const connection = MySqlDBConnection.getConnection();
            const existingUserQuery = 'SELECT * FROM users WHERE email = ?;';
            const [existingUsers] = await connection.query(existingUserQuery, [data.email]);
            if (existingUsers.length > 0) {
                return {
                    status: 409,
                    data: {
                        status: 'error',
                        success: false,
                        message: 'Email already exists'
                    }
                };
            }
            const query = 'INSERT INTO users (id, name, age, email,role,createTime) VALUES (?,?,?,?,?,?);';
            const params = [randomUUID(), data.name, data.age, data.email, data.role, timestampCreate()];
            const [user] = await connection.query(query, params);
            return {
                status: 201,
                data: {
                    status: 'success',
                    success: true,
                    payload: user
                }
            };
        } catch (error) {
            return {
                status: 500,
                data: {
                    status: 'error',
                    success: false,
                    message: error
                }
            };
        }
    };

    static delete = async ({ id }) => {
        try {
            const connection = MySqlDBConnection.getConnection();
            let query = 'SELECT * FROM users WHERE id = ?;';
            const params = [id];
            const [rows] = await connection.query(query, params);
            if (rows.length === 0) {
                return {
                    status: 404,
                    data: {
                        status: 'error',
                        success: false,
                        message: 'User not found'
                    }
                };
            }
            query = 'DELETE FROM users WHERE id = ?;';
            await connection.query(query, params);
            return {
                status: 200,
                data: {
                    status: 'success',
                    success: true,
                    message: 'User successfully deleted'
                }
            };
        } catch (error) {
            return {
                status: 500,
                data: {
                    status: 'error',
                    success: false,
                    message: error
                }
            };
        }
    };

    static updateSpecific = async () => {

    };

    static updatePartial = async ({ id, data }) => {

    };
}
