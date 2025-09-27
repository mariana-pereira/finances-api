import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InvestmentBodySchema } from './investments.controller';
import { UserPayload } from '../auth/jwt.strategy';

@Injectable()
export class InvestmentsService {
  constructor(private prismaService: PrismaService) {}

  async create(
      investmentData: InvestmentBodySchema,
      user: UserPayload,
    ) {
      const { type, tax_rate, amount, date, expiration_date, account_id, objective_id } = investmentData;
  
      const userId = user.sub;
  
      const data = {
        type,
        tax_rate,
        amount,
        date,
        expiration_date,
        account_id,
        objective_id,
        user_id: userId
      }
  
      const investment = await this.prismaService.investment.create({
        data
      });
  
      return investment;
    }

  async sumByAllObjectives() {
  // Step 1: group investments by objective_id
  const grouped = await this.prismaService.investment.groupBy({
    by: ['objective_id'],
    _sum: { amount: true },
  });

  if (grouped.length === 0) return [];

  // Step 2: fetch objectives
  const objectiveIds = grouped.map(g => g.objective_id);

  const objectives = await this.prismaService.objective.findMany({
    where: { id: { in: objectiveIds } },
    select: { id: true, name: true, target_amount: true },
  });

  // Step 3: merge sums with objective names
  return grouped.map(g => {
    const obj = objectives.find(o => o.id === g.objective_id);
    return {
      objectiveId: g.objective_id,
      objectiveName: obj?.name ?? 'Unknown',
      targetAmount: obj?.target_amount ?? 0,
      total: g._sum.amount ?? 0,
    };
  });
}
}
