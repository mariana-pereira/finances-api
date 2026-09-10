import { Injectable } from '@nestjs/common';
import { CardRepository } from '../../domain/repositories/card.repository';

@Injectable()
export class GetAllCardsUseCase {
  constructor(
    private cardRepository: CardRepository,
  ) {}

  async execute(userId: string) {
    return this.cardRepository.findAll(userId);
  }
}
