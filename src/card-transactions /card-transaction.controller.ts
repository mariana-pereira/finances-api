import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { z } from 'zod';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { CardTransactionService } from './card-transaction.service';

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
