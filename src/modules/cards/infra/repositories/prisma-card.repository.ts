import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { CardRepository } from '../../domain/repositories/card.repository';
import { CardDto } from '../../application/dtos/card.dto';
import { Card } from '../../domain/entities/card.entity';


@Injectable()
export class PrismaCardRepository implements CardRepository {
  constructor(private prisma: PrismaService) { }

  async create(card: CardDto): Promise<Card> {
    const data = await this.prisma.card.create({
      data: {
        id: card.id,
        name: card.name,
        card_number: card.card_number,
        expiration: card.expiration,
        emitter: card.emitter,
        account_id: card.account_id,
        user_id: card.user_id,
      },
    });
    return new Card(data.id, data.name, data.card_number, data.expiration, data.emitter, data.account_id, data.user_id);
  }

  async findById(id: string): Promise<Card | null> {
    const card = await this.prisma.card.findUnique({ where: { id } });
    if (!card) return null;
    return new Card(card.id, card.name, card.card_number, card.expiration, card.emitter, card.account_id, card.user_id);
  }

  async findAll(userId: string): Promise<Card[] | null> {
    const data = await this.prisma.card.findMany({ where: { user_id: userId } });
    if (!data) return null;

    return data.map(
      (card) =>
        new Card(
          card.id,
          card.name,
          card.card_number,
          card.expiration,
          card.emitter,
          card.account_id,
          card.user_id
        ),
    );
  }
}
