import { Router } from 'express';

import SessionController from '@modules/auth/usecases/session-controller';

const sessionsRouter = Router();

sessionsRouter.post('/', SessionController.store);

export default sessionsRouter;
