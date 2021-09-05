import { Router } from 'express';

import CreateUserController from '@modules/users/usecases/create-user/create-user-controller';
import DeleteUserController from '@modules/users/usecases/delete-user/delete-user-controller';

import authMiddleware from '../middlewares/authMiddleware';

const usersRouter = Router();

usersRouter.post('/', CreateUserController.handle);

usersRouter.use(authMiddleware);

// usersRouter.get('/:id', UserController.show);

usersRouter.delete('/:id', DeleteUserController.handle);

export default usersRouter;
