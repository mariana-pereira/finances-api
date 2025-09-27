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
  
      // const investmentExists = await this.prismaService.investment.findFirst({
      //   where: {
      //     : account_number,
      //   },
      // });
  
      // if (accountsExists) {
      //   throw new Error('Account already exists.');
      // }
  
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

  // async sumByObjective(objectiveId: string) {
  //   const result = await this.prisma.investment.aggregate({
  //     _sum: { amount: true },
  //     where: { objectiveId },
  //   });
  //   return result._sum.amount ?? 0;
  // }

  // async sumByAllObjectives() {
  //   const results = await this.prisma.investment.groupBy({
  //     by: ['objectiveId'],
  //     _sum: { amount: true },
  //   });

  //   return results.map(r => ({
  //     objectiveId: r.objectiveId,
  //     total: r._sum.amount ?? 0,
  //   }));
  // }
}
