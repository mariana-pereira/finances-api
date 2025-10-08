import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CardController } from './card.controller';
import { CardService } from './card.service';

@Module({
  controllers: [CardController],
  providers: [CardService, PrismaService],

})
export class CardModule {}
