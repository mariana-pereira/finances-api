import { Router } from 'express';

import UserController from '@modules/users/usecases/user-controller';

import authMiddleware from '../middlewares/authMiddleware';

const usersRouter = Router();

usersRouter.post('/', UserController.store);

usersRouter.use(authMiddleware);

usersRouter.get('/:id', UserController.show);

usersRouter.delete('/:id', UserController.delete);

export default usersRouter;
