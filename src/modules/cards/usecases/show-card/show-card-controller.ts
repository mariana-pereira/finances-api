import { Request, Response } from 'express';

import { ShowCardUseCase } from './show-card-usecase';

class ShowCardController {
  public async handle (request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const showCard = new ShowCardUseCase();

      const card = await showCard.execute({ id });

      return response.status(200).json(card);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new ShowCardController();
