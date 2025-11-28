import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './accounts/account.module';
import { envSchema } from './env';
import { PrismaService } from './prisma/prisma.service';
import { InvestmentModule } from './investments/investment.module';
import { ObjectiveModule } from './objectives/objective.module';
import { TransactionModule } from './transactions/transaction.module';
import { CardModule } from './cards/card.module';
import { CardTransactionModule } from './card-transactions /card-transaction.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/auth.controller';

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
    CardModule,
    CardTransactionModule
  ],
  controllers: [AuthController],
  providers: [PrismaService],
})
export class AppModule {}
