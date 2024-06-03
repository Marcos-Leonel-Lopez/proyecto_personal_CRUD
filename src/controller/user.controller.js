/* eslint-disable indent */
import { randomUUID } from 'crypto';
import { readJSON } from '../utils.js';
const users = readJSON('../empleados.json');

export default class UserController {
    static getAll = async ({ filt }) => {
        console.log(users);
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
            ...data
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

    static update = async ({ id, data }) => {
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

    static deleteAll = async () => {
        users.splice(0, users.length);
        return true;
    };
}
