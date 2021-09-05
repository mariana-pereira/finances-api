import { Router } from 'express';

import CreateAccountController from '@modules/accounts/usecases/create-account/create-account-controller';

import authMiddleware from '../middlewares/authMiddleware';

const accountsRouter = Router();

accountsRouter.use(authMiddleware);

accountsRouter.post('/', CreateAccountController.handle);

// accountsRouter.get('/', AccountController.index);

// accountsRouter.get('/:id', AccountController.show);

// accountsRouter.put('/:id', AccountController.update);

// accountsRouter.delete('/:id', AccountController.delete);

export default accountsRouter;
