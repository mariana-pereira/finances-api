import { Router } from 'express';

import CreateUserController from '@modules/users/usecases/create-user/create-user-controller';

import authMiddleware from '../middlewares/authMiddleware';

const usersRouter = Router();

usersRouter.post('/', CreateUserController.handle);

usersRouter.use(authMiddleware);

// usersRouter.get('/:id', UserController.show);

// usersRouter.delete('/:id', UserController.delete);

export default usersRouter;
