import { Router } from 'express';

import UserController from '@controllers/UserController';

const usersRouter = Router();

usersRouter.post('/', UserController.store);

usersRouter.get('/:id', UserController.show);

export default usersRouter;
