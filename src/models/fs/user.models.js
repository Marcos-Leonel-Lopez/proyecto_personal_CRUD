/* eslint-disable indent */
// VALIDAR QUE LOS DATOS SEAN UNICOS EN CASO DE SER REQUERIDO, GARANTIZAR LA INTEGRIDAD DE LA BASE DE DATOS
import { randomUUID } from 'crypto';
import { readJSON, timestampCreate } from '../../utils.js';
const users = readJSON('../empleados.json');

export default class UserModel {
    static getAll = async ({ filt }) => {
        if (filt) {
            return users.filter((user) => user.role.toLowerCase() === filt.toLowerCase());
        }
        return users;
    };

    static getById = async (id) => {
        const user = users.find((empleado) => empleado.id === id);
        return user;
    };

    static create = async ({ data }) => {
        const newUser = {
            id: randomUUID(),
            ...data,
            createTime: timestampCreate()
        };
        users.push(newUser);
        return newUser;
    };

    static delete = async ({ id }) => {
        const index = users.findIndex((user) => user.id === id);
        if (index === -1) {
            return false;
        }
        users.splice(index, 1);
        return true;
    };

    // static update = async ({ id, data }) => {
    //     const index = users.findIndex((user) => user.id === id);
    //     if (index === -1) {
    //         return false;
    //     }
    //     const updatedUser = {
    //         ...users[index],
    //         ...data
    //     };
    //     users[index] = updatedUser;
    //     return updatedUser;
    // };

    static updateSpecific = async () => {
        users.forEach(user => {
            user.createTime = timestampCreate();
        });
        return users;
    };

    static updatePartial = async ({ id, data }) => {
        const index = users.findIndex((user) => user.id === id);
        if (index === -1) {
            return false;
        }
        const updatedUser = {
            ...users[index],
            ...data
        };
        users[index] = updatedUser;
        return updatedUser;
    };

    // static deleteAll = async () => {
    //     users.splice(0, users.length);
    //     return true;
    // };
}
