import { Router } from 'express';

import CreateCardController from '@modules/cards/usecases/create-card/create-card-controller';
import ListCardsController from '@modules/cards/usecases/list-cards/list-cards-controller';

import authMiddleware from '../middlewares/authMiddleware';

const cardsRouter = Router();

cardsRouter.use(authMiddleware);

cardsRouter.post('/', CreateCardController.handle);

cardsRouter.get('/', ListCardsController.handle);

export default cardsRouter;
