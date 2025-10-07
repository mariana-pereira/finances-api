import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './accounts/account.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { envSchema } from './env';
import { PrismaService } from './prisma/prisma.service';
import { InvestmentModule } from './investments/investment.module';
import { ObjectiveModule } from './objectives/objective.module';
import { TransactionModule } from './transactions/transaction.module';
import { CardModule } from './cards/card.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    AccountModule,
    InvestmentModule,
    ObjectiveModule,
    TransactionModule,
    CardModule
  ],
  controllers: [AuthController],
  providers: [PrismaService],
})
export class AppModule {}
