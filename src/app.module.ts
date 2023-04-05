import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './application/modules/user.module';
import { AuthModule } from './application/modules/auth.module';
import { PrismaModule } from './infra/database/prisma/prisma.module';
import { AccountModule } from './application/modules/account.module';
import { TargetModule } from './application/modules/target.module';
import { InvestmentsModule } from './application/modules/investment.module';
import { TransactionModule } from './application/modules/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    PrismaModule,
    AccountModule,
    TargetModule,
    InvestmentsModule,
    TransactionModule,
  ],
})
export class AppModule {}
