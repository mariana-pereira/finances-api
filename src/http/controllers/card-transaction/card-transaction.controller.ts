import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CardTransactionService } from 'src/application/services/card-transaction/card-transaction.service';
import { GetUser } from 'src/auth/decorators';
import { CreateCardTransactionDto } from 'src/http/dtos/card-transaction/createCardTransaction.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('card-transactions')
export class CardTransactionController {
  constructor(private cardTransactionService: CardTransactionService) {}

  @Post()
  createTransaction(
    @GetUser('id') userId: string,

    @Body() data: CreateCardTransactionDto,
    @Headers('Card') cardId: string,
  ) {
    return this.cardTransactionService.createCardTransaction(
      userId,
      cardId,
      data,
    );
  }
}
