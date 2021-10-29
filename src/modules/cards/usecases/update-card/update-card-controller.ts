import { Request, Response } from 'express';

import { UpdateCardUseCase } from './update-card-usecase';

class UpdateCardController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      name, number, limit, expiry_day,
    } = request.body;

    const updateCard = new UpdateCardUseCase();

    const card = await updateCard.execute({
      id,
      name,
      number,
      limit,
      expiry_day,
    });

    return response.status(200).json(card);
  }
}

export default new UpdateCardController();
