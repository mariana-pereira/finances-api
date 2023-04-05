import { Injectable } from '@nestjs/common';
import { CreateCardDto } from 'src/http/dtos/card';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class CardService {
  constructor(private prismaService: PrismaService) {}

  async createCard(userId: string, data: CreateCardDto) {
    const card = await this.prismaService.card.create({
      data: {
        userId,
        ...data,
      },
    });

    return card;
  }
}
