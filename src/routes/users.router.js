/* eslint-disable indent */
import { Router } from 'express';

import UserController from '../controllers/users.controller.js';

const router = Router();

router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);

router.post('/', UserController.create);
router.delete('/:id', UserController.delete);
router.patch('/:id', UserController.updatePartial);
// router.patch('/Specific', UserController.updateSpecific);

export default router;
