import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { CurrentUser } from '../auth/current-user-decorator';
import { UserPayload } from '../auth/jwt.strategy';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { InvestmentService } from './investment.service';

const investmentBodySchema = z.object({
  type: z.string(),
  tax_rate: z.string(),
  amount: z.number(),
  date:  z.string().datetime(),
  expiration_date:  z.string().datetime().optional(),
  account_id: z.string().uuid(),
  objective_id: z.string().uuid(),
});

const bodyValidationPipe = new ZodValidationPipe(investmentBodySchema);

export type InvestmentBodySchema = z.infer<typeof investmentBodySchema>;

@Controller('/investments')
@UseGuards(JwtAuthGuard)
export class InvestmentController {
  constructor(private readonly investmentsService: InvestmentService) {}

  @Post()
    async create(
      @Body(bodyValidationPipe) body: InvestmentBodySchema,
      @CurrentUser() user: UserPayload,
    ) {
      return this.investmentsService.create(body, user);
    }

  @Get('sum')
  async getSumByAllObjectives() {
    return this.investmentsService.sumByAllObjectives();
  }
}
