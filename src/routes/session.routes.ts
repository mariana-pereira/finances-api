import { Router } from 'express';

import SessionController from '@modules/users/usecases/user-controller';

const sessionsRouter = Router();

sessionsRouter.post('/', SessionController.store);

export default sessionsRouter;
