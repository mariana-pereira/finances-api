import { Injectable } from '@nestjs/common';
import { CardDto } from '../dtos/card.dto';
import { CardRepository } from '../../domain/repositories/card.repository';

@Injectable()
export class CreateCardUseCase {
  constructor(
    private cardRepository: CardRepository,
  ) {}

  async execute(input: CardDto) {
    return this.cardRepository.create(input);
  }
}
