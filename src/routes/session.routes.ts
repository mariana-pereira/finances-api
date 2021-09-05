import { Router } from 'express';

import AuthenticateUserController from '@modules/users/usecases/authenticate-user/authenticate-user-controller';

const sessionsRouter = Router();

sessionsRouter.post('/', AuthenticateUserController.handle);

export default sessionsRouter;
