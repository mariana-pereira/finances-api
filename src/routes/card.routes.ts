import { Router } from 'express';

import CreateCardController from '@modules/cards/create-card/create-card-controller';

import authMiddleware from '../middlewares/authMiddleware';

const cardsRouter = Router();

cardsRouter.use(authMiddleware);

cardsRouter.post('/', CreateCardController.handle);

export default cardsRouter;
