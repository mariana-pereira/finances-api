import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransactionService } from 'src/application/services/transaction/transaction.service';
import { GetUser } from 'src/auth/decorators';
import { CreateTransactionDto } from 'src/http/dtos/transaction/createTransaction.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  createTransaction(
    @GetUser('id') userId: string,

    @Body() data: CreateTransactionDto,
    @Headers('Account') accountId: string,
  ) {
    return this.transactionService.createTransaction(userId, accountId, data);
  }
}
