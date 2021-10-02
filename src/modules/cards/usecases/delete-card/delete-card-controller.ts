import { Request, Response } from 'express';

import { DeleteCardUseCase } from './delete-card-usecase';

class DeleteCardController {
  public async handle (request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const deleteCard = new DeleteCardUseCase();

      await deleteCard.execute({ id });

      return response.status(200).json({ message: 'Card successfully deleted.'});
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new DeleteCardController();
