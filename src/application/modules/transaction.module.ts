import { Module } from '@nestjs/common';
import { TransactionController } from 'src/http/controllers/transaction/transaction.controller';
import { TransactionService } from '../services/transaction/transaction.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
