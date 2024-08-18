/* eslint-disable indent */
import { userPersistence } from '../DAO/factory.js';
import { UserRepository } from './user.repository.js';

export const userService = new UserRepository(userPersistence);
