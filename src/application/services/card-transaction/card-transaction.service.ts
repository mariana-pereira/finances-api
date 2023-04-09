import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCardTransactionDto } from 'src/http/dtos/card-transaction/createCardTransaction.dto';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class CardTransactionService {
  constructor(private prismaService: PrismaService) {}

  async createCardTransaction(
    userId: string,
    cardId: string,
    data: CreateCardTransactionDto,
  ) {
    try {
      const cardExists = await this.prismaService.card.findFirst({
        where: {
          id: cardId,
        },
      });

      if (!cardExists) {
        throw new ForbiddenException('Card not found.');
      }
    } catch (error) {
      console.log(error);
    }
    const cardTransaction = await this.prismaService.cardTransaction.create({
      data: {
        userId,
        cardId,
        ...data,
      },
    });

    return cardTransaction;
  }
}
