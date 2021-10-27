import { getRepository } from 'typeorm';

import { Card } from '@modules/cards/model/card';

interface Request {
  id: string;
}

class ShowCardUseCase {
  public async execute({ id }: Request): Promise<Card> {
    const cardsRepository = getRepository(Card);

    const card = await cardsRepository.findOne({
      where: { id }
     });

    if (!card) {
      throw new Error('Account not found.');
    }

    return card;
  }
}

export { ShowCardUseCase };