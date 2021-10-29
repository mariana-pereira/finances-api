import { Request, Response } from 'express';

import { ShowCardUseCase } from './show-card-usecase';

class ShowCardController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCard = new ShowCardUseCase();

    const card = await showCard.execute({ id });

    return response.status(200).json(card);
  }
}

export default new ShowCardController();
