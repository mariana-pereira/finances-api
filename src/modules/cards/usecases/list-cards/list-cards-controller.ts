import { Request, Response } from 'express';

import { ListCardsUseCase } from './list-cards-usecase';

class ListCardsController {
  public async handle (request: Request, response: Response): Promise<Response> {
    try {
      const listCards = new ListCardsUseCase();

      const user_id = request.user.id;

      const cards = await listCards.execute({ user_id });

      return response.status(200).json(cards);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new ListCardsController();
