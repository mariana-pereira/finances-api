import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { z } from 'zod';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation-pipe';

const transactionBodySchema = z.object({
  type: z.string(),
  amount: z.number(),
  date:  z.string().datetime(),
  account_id: z.string().uuid()
});

const bodyValidationPipe = new ZodValidationPipe(transactionBodySchema);

export type TransactionBodySchema = z.infer<typeof transactionBodySchema>;

@Controller('/transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(
    @Body(bodyValidationPipe) body: TransactionBodySchema,
  ) {
    return this.transactionService.create(body);
  }
}
