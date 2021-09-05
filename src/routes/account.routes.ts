import { Router } from 'express';

import CreateAccountController from '@modules/accounts/usecases/create-account/create-account-controller';
import DeleteAccountController from '@modules/accounts/usecases/delete-account/delete-account-controller';
import ListAccountsController from '@modules/accounts/usecases/list-accounts/list-accounts-controller';
import ShowAccountController from '@modules/accounts/usecases/show-account/show-account-controller';

import authMiddleware from '../middlewares/authMiddleware';

const accountsRouter = Router();

accountsRouter.use(authMiddleware);

accountsRouter.post('/', CreateAccountController.handle);

accountsRouter.get('/', ListAccountsController.handle);

accountsRouter.get('/:id', ShowAccountController.handle);

// accountsRouter.put('/:id', AccountController.update);

accountsRouter.delete('/:id', DeleteAccountController.handle);

export default accountsRouter;
