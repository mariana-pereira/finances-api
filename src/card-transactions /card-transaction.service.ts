import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CardTransactionBodySchema } from './card-transaction.controller';

@Injectable()
export class CardTransactionService {
  constructor(private prismaService: PrismaService) {}

  async create(
    cardTransactionData: CardTransactionBodySchema
  ) {
    const { type, amount, date, card_id } = cardTransactionData;

    const data = {
      type,
      amount,
      date,
      card_id,
    }

    const cardTransaction = await this.prismaService.cardTransaction.create({
      data
    });

    return cardTransaction;
  }
}