/* eslint-disable indent */
import { Router } from 'express';
// import { randomUUID } from 'crypto';

import { validateUser, validatePartialUser } from '../schemas/users.js';
import UserController from '../controller/user.controller.js';

// const userController = new UserController();
const router = Router();

router.get('/', async (req, res) => {
    const { role } = req.query;
    const users = await UserController.getAll({ role });
    res.json(users);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await UserController.getById(id);
    if (user) { return res.json(user); }
    res.status(404).json({ error: 'Not found' });
});

router.post('/', async (req, res) => {
    const resultado = validateUser(req.body);
    if (resultado.error) {
        return res.status(422).json({ error: JSON.parse(resultado.error.message) });
    }
    const newUser = await UserController.create({ input: resultado.data });
    res.status(201).json({ message: 'Empleado creado exitosamente', data: newUser });
});

router.patch('/:id', async (req, res) => {
    const resultado = validatePartialUser(req.body);
    if (resultado.error) {
        return res.status(422).json({ error: JSON.parse(resultado.error.message) });
    }
    const { id } = req.params;
    const result = await UserController.update({ id, input: resultado.data });
    if (result) {
        res.status(200).json({ message: 'Empleado actualizado exitosamente', data: result });
    }
    res.status(404).json({ error: 'No encontrado' });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await UserController.delete({ id });
    if (result) {
        res.status(200).json({ message: 'Usuario eliminado' });
    }
    res.status(404).json({ error: 'No encontrado' });
});

// router.patch('/', (req, res) => {
//     empleados.forEach(empleado => {
//         empleado.id = crypto.randomUUID();
//     });
//     res.status(200).json({ message: 'IDs actualizados exitosamente' });
// });

export default router;
