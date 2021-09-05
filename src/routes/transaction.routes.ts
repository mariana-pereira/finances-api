import { Router } from 'express';

import CreateTransactionController from '@modules/transactions/usecases/create-transaction/create-transaction-controller';

import authMiddleware from '../middlewares/authMiddleware';

const transactionsRouter = Router();

transactionsRouter.use(authMiddleware);

transactionsRouter.post('/', CreateTransactionController.handle);

// transactionsRouter.get('/', TransactionController.index);

export default transactionsRouter;
