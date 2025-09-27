import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InvestmentsController } from './investments.controller';
import { InvestmentsService } from './investments.service';

@Module({
  controllers: [InvestmentsController],
  providers: [InvestmentsService, PrismaService],

})
export class InvestmentsModule {}