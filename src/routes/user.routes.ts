import { Router } from 'express';

import UserController from '@controllers/UserController';

const usersRouter = Router();

usersRouter.post('/', UserController.store);

usersRouter.get('/:id', UserController.show);

usersRouter.delete('/:id', UserController.delete);

export default usersRouter;
