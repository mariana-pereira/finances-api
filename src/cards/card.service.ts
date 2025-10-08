import { Injectable } from '@nestjs/common';
import { UserPayload } from '../auth/jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { CardBodySchema } from './card.controller';

@Injectable()
export class CardService {
  constructor(private prismaService: PrismaService) {}

  async create(
    cardData: CardBodySchema,
    user: UserPayload
  ) {
    const { name, card_number, expiration, emitter, account_id } = cardData;

    const userId = user.sub;

    const cardExists = await this.prismaService.card.findFirst({
      where: {
        card_number,
      },
    });

    if (cardExists) {
      throw new Error('Card already exists.');
    }

    const data = {
      name,
      card_number,
      expiration,
      emitter,
      account_id,
      user_id: userId
    }

    const card = await this.prismaService.card.create({
      data
    });

    return card;
  }

  async findAll(user: UserPayload) {
    const userId = user.sub;

    return this.prismaService.card.findMany({
      where: {
        user_id: userId,
      },
    });
  }
}