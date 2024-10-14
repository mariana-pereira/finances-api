import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './accounts/account.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { envSchema } from './env';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    AccountModule
  ],
  controllers: [AuthController],
  providers: [PrismaService],
})
export class AppModule {}
