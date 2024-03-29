import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './application/modules/user.module';
import { AuthModule } from './application/modules/auth.module';
import { PrismaModule } from './infra/database/prisma/prisma.module';
import { AccountModule } from './application/modules/account.module';
import { TargetModule } from './application/modules/target.module';
import { InvestmentsModule } from './application/modules/investment.module';
import { CardModule } from './application/modules/card.module';
import { AccountTransactionModule } from './application/modules/account-transaction.module';
import { CardTransactionModule } from './application/modules/card-transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    PrismaModule,
    AccountModule,
    TargetModule,
    InvestmentsModule,
    AccountTransactionModule,
    CardModule,
    CardTransactionModule,
  ],
})
export class AppModule {}
