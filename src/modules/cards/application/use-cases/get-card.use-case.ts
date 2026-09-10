import { Injectable } from '@nestjs/common';
import { CardRepository } from '../../domain/repositories/card.repository';
@Injectable()
export class GetCardUseCase {
  constructor(
    private cardRepository: CardRepository,
  ) {}

  async execute(id: string) {
    return this.cardRepository.findById(id);
  }
}