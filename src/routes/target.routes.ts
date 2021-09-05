import { Router } from 'express';

import CreateTargetController from '@modules/targets/usecases/create-target/create-target-controller';

import authMiddleware from '../middlewares/authMiddleware';

const targetsRouter = Router();

targetsRouter.use(authMiddleware);

targetsRouter.post('/', CreateTargetController.handle);

// targetsRouter.get('/', TargetController.index);

// targetsRouter.get('/:id', TargetController.show);

// targetsRouter.put('/:id', TargetController.update);

// targetsRouter.delete('/:id', TargetController.delete);

export default targetsRouter;
