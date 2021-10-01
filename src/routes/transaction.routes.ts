import { Router } from 'express';

import multerConfig from '@config/multer';
import CreateTransactionController from '@modules/transactions/usecases/create-transaction/create-transaction-controller';
import ImportTransactionsController from '@modules/transactions/usecases/import-transactions/import-transactions-controller';
import ListAllTransactionsController from '@modules/transactions/usecases/list-all-transactions/list-all-transactions-controller';

import authMiddleware from '../middlewares/authMiddleware';

const transactionsRouter = Router();

transactionsRouter.use(authMiddleware);

transactionsRouter.post('/', CreateTransactionController.handle);

transactionsRouter.post('/import', multerConfig.single('file'), ImportTransactionsController.handle);

transactionsRouter.get('/', ListAllTransactionsController.handle);

export default transactionsRouter;
