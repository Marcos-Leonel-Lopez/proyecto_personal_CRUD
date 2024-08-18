/* eslint-disable indent */
import { Router } from 'express';

import UserController from '../controllers/users.controller.js';

const userController = new UserController();
const router = Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getById);

router.post('/', userController.create);
router.delete('/:id', userController.delete);
router.patch('/Specific', userController.updateSpecific);
router.patch('/:id', userController.updatePartial);

export default router;
