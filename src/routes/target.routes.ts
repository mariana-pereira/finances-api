import { Router } from 'express';

import TargetController from '@modules/targets/usecases/target-controller';

import authMiddleware from '../middlewares/authMiddleware';

const targetsRouter = Router();

targetsRouter.use(authMiddleware);

targetsRouter.post('/', TargetController.store);

export default targetsRouter;
