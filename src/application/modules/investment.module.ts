import { Module } from '@nestjs/common';
import { InvestmentController } from 'src/http/controllers/investment/investment.controller';
import { InvestmentService } from '../services/investment/investment.service';

@Module({
  controllers: [InvestmentController],
  providers: [InvestmentService],
})
export class InvestmentsModule {}
