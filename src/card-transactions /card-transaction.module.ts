import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CardTransactionController } from './card-transaction.controller';
import { CardTransactionService } from './card-transaction.service';

@Module({
  controllers: [CardTransactionController],
  providers: [CardTransactionService, PrismaService],

})
export class CardTransactionModule {}
