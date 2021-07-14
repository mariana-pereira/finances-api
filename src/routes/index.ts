import { Router } from 'express';

import accountsRouter from './account.routes';
import sessionsRouter from './session.routes';
import usersRouter from './user.routes';

const routes = Router();

routes.use('/users', usersRouter);

routes.use('/session', sessionsRouter);

routes.use('/accounts', accountsRouter);

export default routes;
