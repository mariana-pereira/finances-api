import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InvestmentController } from './investment.controller';
import { InvestmentService } from './investment.service';

@Module({
  controllers: [InvestmentController],
  providers: [InvestmentService, PrismaService],

})
export class InvestmentModule {}