import { Module } from '@nestjs/common';
import { CardController } from '../../cards/card.controller';
import { CardService } from '../../cards/card.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [CardController],
  providers: [CardService, PrismaService],

})
export class CardModule {}
