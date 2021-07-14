import { Router } from 'express';

import UserController from '@controllers/UserController';

import authMiddleware from '../middlewares/authMiddleware';

const usersRouter = Router();

usersRouter.post('/', UserController.store);

usersRouter.use(authMiddleware);

usersRouter.get('/:id', UserController.show);

usersRouter.delete('/:id', UserController.delete);

export default usersRouter;
