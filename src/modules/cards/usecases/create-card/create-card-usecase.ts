import { getRepository } from 'typeorm';

import { Card } from '@modules/cards/model/card';

interface Request {
  name: string;
  number: string;
  limit: number;
  expiry_day: number;
  user_id: string;
}

class CreateCardUseCase {
  public async execute({ name, number, limit, expiry_day, user_id }: Request): Promise<Card> {
    const cardsRepository = getRepository(Card);

    const card = cardsRepository.create({
      name,
      number,
      limit,
      expiry_day,
      user_id
    });

    await cardsRepository.save(card);

    return card;
  }
}

export { CreateCardUseCase };
