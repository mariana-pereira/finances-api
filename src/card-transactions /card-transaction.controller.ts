import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { z } from 'zod';
import { CardTransactionService } from './card-transaction.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation-pipe';

const cardTransactionBodySchema = z.object({
  type: z.string(),
  amount: z.number(),
  date:  z.string().datetime(),
  card_id: z.string().uuid()
});

const bodyValidationPipe = new ZodValidationPipe(cardTransactionBodySchema);

export type CardTransactionBodySchema = z.infer<typeof cardTransactionBodySchema>;

@Controller('/card-transactions')
@UseGuards(JwtAuthGuard)
export class CardTransactionController {
  constructor(private readonly cardTransactionService: CardTransactionService) {}

  @Post()
  async create(
    @Body(bodyValidationPipe) body: CardTransactionBodySchema,
  ) {
    return this.cardTransactionService.create(body);
  }
}
