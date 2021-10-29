import { getRepository } from 'typeorm';

import { Card } from '@modules/cards/model/card';
import AppError from '@errors/AppError';

interface Request {
  id: string;
}

class DeleteCardUseCase {
  public async execute({ id }: Request): Promise<void> {
    const cardsRepository = getRepository(Card);

    const card = await cardsRepository.findOne({
      where: { id },
    });

    if (!card) {
      throw new AppError('Card not found.');
    }

    await cardsRepository.delete(id);
  }
}

export { DeleteCardUseCase };
