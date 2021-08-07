import { Router } from 'express';

import TransactionController from '@modules/transactions/usecases/transaction-controller';

import authMiddleware from '../middlewares/authMiddleware';

const transactionsRouter = Router();

transactionsRouter.use(authMiddleware);

transactionsRouter.post('/', TransactionController.store);

transactionsRouter.get('/', TransactionController.index);

export default transactionsRouter;
