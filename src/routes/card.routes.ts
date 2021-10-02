import { Router } from 'express';

import CreateCardController from '@modules/cards/usecases/create-card/create-card-controller';
import ListCardsController from '@modules/cards/usecases/list-cards/list-cards-controller';
import ShowCardController from '@modules/cards/usecases/show-card/show-card-controller';

import authMiddleware from '../middlewares/authMiddleware';

const cardsRouter = Router();

cardsRouter.use(authMiddleware);

cardsRouter.post('/', CreateCardController.handle);

cardsRouter.get('/', ListCardsController.handle);

cardsRouter.get('/:id', ShowCardController.handle);

export default cardsRouter;
