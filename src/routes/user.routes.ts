import { Router } from 'express';

import CreateUserController from '@modules/users/usecases/create-user/create-user-controller';
import DeleteUserController from '@modules/users/usecases/delete-user/delete-user-controller';
import ShowUserController from '@modules/users/usecases/show-user/show-user-controller';

import authMiddleware from '../middlewares/authMiddleware';

const usersRouter = Router();

usersRouter.post('/', CreateUserController.handle);

usersRouter.use(authMiddleware);

usersRouter.get('/:id', ShowUserController.handle);

usersRouter.delete('/:id', DeleteUserController.handle);

export default usersRouter;
