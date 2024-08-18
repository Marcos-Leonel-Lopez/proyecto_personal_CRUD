/* eslint-disable indent */
// VALIDAR QUE LOS DATOS SEAN COHERENTES, CAMPOS REQUERIDOS, RANGOS, TIPOS, ETC...

// import UserModel from '../models/fs/user.models.js';
// import UserModel from '../models/MySQL/user.models.js';

import { validateUser, validatePartialUser } from '../schemas/users.js';
import { userService } from '../repository/index.repository.js';
export default class UserController {
    getAll = async (req, res) => {
        try {
            const { role } = req.query;
            const { status, data } = await userService.getAll({ role });
            res.status(status).json(data);
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            });
        }
    };

    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const { status, data } = await userService.getById({ id });
            res.status(status).json(data);
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            });
        }
    };

    create = async (req, res) => {
        try {
            const resultado = validateUser(req.body);
            if (resultado.error) {
                return res.status(422).json({
                    status: 'error',
                    success: false,
                    message: JSON.parse(resultado.error.message)
                });
            }
            const { status, data } = await userService.create({ data: resultado.data });
            res.status(status).json(data);
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            });
        }
    };

    // create = async (req, res) => {
    //     const resultado = validateUser(req.body);
    //     if (resultado.error) {
    //         return res.status(422).json({ error: JSON.parse(resultado.error.message) });
    //     }
    //     const newUser = await userService.create({ data: resultado.data });
    //     res.status(201).json({ message: 'Empleado creado exitosamente', data: newUser });
    // };

    delete = async (req, res) => {
        const { id } = req.params;
        const result = await userService.delete({ id });
        if (result) {
            return res.status(200).json({ message: 'Usuario eliminado' });
        }
        res.status(404).json({ error: 'No encontrado' });
    };

    updatePartial = async (req, res) => {
        const resultado = validatePartialUser(req.body);
        if (resultado.error) {
            return res.status(422).json({ error: JSON.parse(resultado.error.message) });
        }
        const { id } = req.params;
        const result = await userService.updatePartial({ id, input: resultado.data });
        if (result) {
            return res.status(200).json({ message: 'Empleado actualizado exitosamente', data: result });
        }
        return res.status(404).json({ error: 'No encontrado' });
    };

    updateSpecific = async (req, res) => {
        const users = await userService.updateSpecific();
        res.status(200).json({ message: 'Timestamps actualizados exitosamente', data: users });
    };
}
