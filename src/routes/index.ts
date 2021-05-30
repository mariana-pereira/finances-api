import { Router } from 'express';

import sessionsRouter from './session.routes';
import usersRouter from './user.routes';

const routes = Router();

routes.use('/users', usersRouter);

routes.use('/session', sessionsRouter);

export default routes;
