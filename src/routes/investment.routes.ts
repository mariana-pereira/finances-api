import { Router } from 'express';

import CreateInvestmentController from '@modules/investments/usecases/create-investment/create-investment-controller';
import ListAllInvestmentsController from '@modules/investments/usecases/list-all-investments/list-all-investments-controller';

import authMiddleware from '../middlewares/authMiddleware';

const investmentsRouter = Router();

investmentsRouter.use(authMiddleware);

investmentsRouter.post('/', CreateInvestmentController.handle);

investmentsRouter.get('/', ListAllInvestmentsController.handle);

export default investmentsRouter;
