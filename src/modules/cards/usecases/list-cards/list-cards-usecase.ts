import { getRepository } from 'typeorm';

import { Card } from '@modules/cards/model/card';

interface Request {
  user_id: string;
}

class ListCardsUseCase {
  public async execute({ user_id }: Request): Promise<Card[]> {
    const cardsRepository = getRepository(Card);

    const cards = cardsRepository.find({ where: { user_id }});

    return cards;
  }
}

export { ListCardsUseCase };
