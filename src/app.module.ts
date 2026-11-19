import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { PrismaService } from './prisma/prisma.service';
import { InvestmentModule } from './investments/investment.module';
import { ObjectiveModule } from './objectives/objective.module';
import { TransactionModule } from './transactions/transaction.module';
import { CardTransactionModule } from './card-transactions /card-transaction.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/presentation/controllers/auth.controller';
import { AccountModule } from './modules/accounts/account.module';
import { CardModule } from './modules/cards/card.module';

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
