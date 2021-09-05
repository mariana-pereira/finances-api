import { Router } from 'express';

import CreateInvestmentController from '@modules/investments/usecases/create-investment/create-investment-controller';

import authMiddleware from '../middlewares/authMiddleware';

const investmentsRouter = Router();

investmentsRouter.use(authMiddleware);

investmentsRouter.post('/', CreateInvestmentController.handle);

// investmentsRouter.get('/', InvestmentController.index);

export default investmentsRouter;
