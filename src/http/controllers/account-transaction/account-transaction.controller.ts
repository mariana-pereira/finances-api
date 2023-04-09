import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountTransactionService } from 'src/application/services/account-transaction/account-transaction.service';
import { GetUser } from 'src/auth/decorators';
import { CreateAccountTransactionDto } from 'src/http/dtos/account-transaction/createAccountTransaction.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('account-transactions')
export class AccountTransactionController {
  constructor(private accountTransactionService: AccountTransactionService) {}

  @Post()
  createTransaction(
    @GetUser('id') userId: string,

    @Body() data: CreateAccountTransactionDto,
    @Headers('Account') accountId: string,
  ) {
    return this.accountTransactionService.createTransaction(
      userId,
      accountId,
      data,
    );
  }
}
