/* eslint-disable indent */
// VALIDAR QUE LOS DATOS SEAN COHERENTES, CAMPOS REQUERIDOS, RANGOS, TIPOS, ETC...

import UserModel from '../models/user.models.js';
import { validateUser, validatePartialUser } from '../schemas/users.js';

export default class UserController {
    static getAll = async (req, res) => {
        const { role } = req.query;
        const users = await UserModel.getAll({ role });
        res.json(users);
    };

    static getById = async (req, res) => {
        const { id } = req.params;
        const user = await UserModel.getById(id);
        if (user) { return res.json(user); }
        res.status(404).json({ error: 'Not found' });
    };

    static create = async (req, res) => {
        const resultado = validateUser(req.body);
        if (resultado.error) {
            return res.status(422).json({ error: JSON.parse(resultado.error.message) });
        }
        const newUser = await UserModel.create({ data: resultado.data });
        res.status(201).json({ message: 'Empleado creado exitosamente', data: newUser });
    };

    static delete = async (req, res) => {
        const { id } = req.params;
        const result = await UserModel.delete({ id });
        if (result) {
            return res.status(200).json({ message: 'Usuario eliminado' });
        }
        res.status(404).json({ error: 'No encontrado' });
    };

    static updatePartial = async (req, res) => {
        const resultado = validatePartialUser(req.body);
        if (resultado.error) {
            return res.status(422).json({ error: JSON.parse(resultado.error.message) });
        }
        const { id } = req.params;
        const result = await UserModel.updatePartial({ id, input: resultado.data });
        if (result) {
            return res.status(200).json({ message: 'Empleado actualizado exitosamente', data: result });
        }
        return res.status(404).json({ error: 'No encontrado' });
    };

    // static updateSpecific = async (req, res) => {
    //     const users = await UserModel.updateSpecific();
    //     res.status(200).json({ message: 'Timestamps actualizados exitosamente', data: users });
    // };
}
