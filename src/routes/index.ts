import { Router } from 'express';

import accountsRouter from './account.routes';
import investmentsRouter from './investment.routes';
import sessionsRouter from './session.routes';
import targetsRouter from './target.routes';
import transactionsRouter from './transaction.routes';
import usersRouter from './user.routes';

const routes = Router();

routes.use('/users', usersRouter);

routes.use('/session', sessionsRouter);

routes.use('/accounts', accountsRouter);

routes.use('/transactions', transactionsRouter);

routes.use('/targets', targetsRouter);

routes.use('/investments', investmentsRouter);

export default routes;
