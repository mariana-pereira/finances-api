import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { z } from 'zod';
import { InvestmentService } from './investment.service';
import { UserPayload } from '../modules/auth/infra/security/jwt.strategy';
import { CurrentUser } from '../modules/auth/presentation/decorators/current-user-decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation-pipe';

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
