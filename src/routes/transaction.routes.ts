import { Router } from 'express';

import CreateTransactionController from '@modules/transactions/usecases/create-transaction/create-transaction-controller';
import ListAllTransactionsController from '@modules/transactions/usecases/list-all-transactions/list-all-transactions-controller';

import authMiddleware from '../middlewares/authMiddleware';

const transactionsRouter = Router();

transactionsRouter.use(authMiddleware);

transactionsRouter.post('/', CreateTransactionController.handle);

transactionsRouter.get('/', ListAllTransactionsController.handle);

export default transactionsRouter;
