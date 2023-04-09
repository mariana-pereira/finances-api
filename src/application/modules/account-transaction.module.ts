import { Module } from '@nestjs/common';
import { AccountTransactionController } from 'src/http/controllers/account-transaction/account-transaction.controller';
import { AccountTransactionService } from '../services/account-transaction/account-transaction.service';

@Module({
  controllers: [AccountTransactionController],
  providers: [AccountTransactionService],
})
export class AccountTransactionModule {}
