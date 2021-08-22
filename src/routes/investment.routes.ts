import { Router } from 'express';

import InvestmentController from '@modules/investments/usecases/investment-controller';

import authMiddleware from '../middlewares/authMiddleware';

const investmentsRouter = Router();

investmentsRouter.use(authMiddleware);

investmentsRouter.post('/', InvestmentController.store);

investmentsRouter.get('/', InvestmentController.index);

export default investmentsRouter;
