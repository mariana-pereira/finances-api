import { Module } from '@nestjs/common';
import { CardService } from '../../cards/card.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CardController } from './presentation/controllers/card.controller';

@Module({
  controllers: [CardController],
  providers: [CardService, PrismaService],

})
export class CardModule {}
