import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './application/modules/user.module';
import { AuthModule } from './application/modules/auth.module';
import { PrismaModule } from './infra/database/prisma/prisma.module';
import { AccountModule } from './application/modules/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    PrismaModule,
    AccountModule,
  ],
})
export class AppModule {}
