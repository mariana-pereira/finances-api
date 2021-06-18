import { Router } from 'express';

import AccountController from '@controllers/AccountController';

import authMiddleware from '../middlewares/authMiddleware';

const accountsRouter = Router();

accountsRouter.use(authMiddleware);

accountsRouter.post('/', AccountController.store);

accountsRouter.get('/', AccountController.index);

accountsRouter.get('/:id', AccountController.show);

export default accountsRouter;
