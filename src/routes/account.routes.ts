import { Router } from 'express';

import AccountController from '@modules/accounts/usecases/account-controller';

import authMiddleware from '../middlewares/authMiddleware';

const accountsRouter = Router();

accountsRouter.use(authMiddleware);

accountsRouter.post('/', AccountController.store);

accountsRouter.get('/', AccountController.index);

accountsRouter.get('/:id', AccountController.show);

accountsRouter.put('/:id', AccountController.update);

accountsRouter.delete('/:id', AccountController.delete);

export default accountsRouter;
