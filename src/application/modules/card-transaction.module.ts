import { Module } from '@nestjs/common';
import { CardTransactionController } from 'src/http/controllers/card-transaction/card-transaction.controller';
import { CardTransactionService } from '../services/card-transaction/card-transaction.service';

@Module({
  controllers: [CardTransactionController],
  providers: [CardTransactionService],
})
export class CardTransactionModule {}
