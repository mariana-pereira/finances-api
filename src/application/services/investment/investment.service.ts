import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateInvestmentDto } from 'src/http/dtos/investment/create-investment.dto';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class InvestmentService {
  constructor(private prismaService: PrismaService) {}

  async createInvestment(
    userId: string,
    accountId: string,
    targetId: string,
    data: CreateInvestmentDto,
  ) {
    try {
      const accountExists = await this.prismaService.account.findFirst({
        where: {
          id: accountId,
        },
      });

      if (!accountExists) {
        throw new ForbiddenException('Account not found.');
      }

      const targetExists = await this.prismaService.target.findFirst({
        where: {
          id: targetId,
        },
      });

      if (!targetExists) {
        throw new ForbiddenException('Target not found.');
      }
    } catch (error) {
      console.log(error);
    }
    const investment = await this.prismaService.investment.create({
      data: {
        userId,
        accountId,
        targetId,
        ...data,
      },
    });

    return investment;
  }
}
