import { getRepository } from 'typeorm';

import { Card } from '@modules/cards/model/card';

interface Request {
  id: string;
  name: string;
  number: string;
  limit: number;
  expiry_day: number;
}

class UpdateCardUseCase {
  public async execute({
    id,
    name,
    number,
    limit,
    expiry_day
  }: Request): Promise<Card> {
    const cardsRepository = getRepository(Card);

    const card = await cardsRepository.findOne({
      where: { id }
     });

    if (!card) {
      throw new Error('Card not found.');
    }

    const updatedCard = cardsRepository.merge(card, { name, number, limit, expiry_day });

    await cardsRepository.save(updatedCard);

    return updatedCard;
  }
}

export { UpdateCardUseCase };
