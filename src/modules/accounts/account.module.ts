import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AccountController } from './presentation/controllers/account.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Env } from '../../env';
import { JwtStrategy } from '../auth/infra/security/jwt.strategy';
import { CreateAccountUseCase } from './application/use-cases/create-account.use-case';
import { GetAccountUseCase } from './application/use-cases/get-account.use-case';
import { GetAllAccountsUseCase } from './application/use-cases/get-all-accounts.use-case';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AccountRepository } from './domain/repositories/account.repository';
import { PrismaAccountRepository } from './infra/repositories/prisma-account.repository';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        const secret = config.get('JWT_SECRET', { infer: true });

        return {
          secret,
        };
      },
    }),
  ],
  controllers: [AccountController],
  providers: [
    PrismaService,
    JwtStrategy,
    JwtAuthGuard,

    {
      provide: AccountRepository,
      useClass: PrismaAccountRepository,
    },

    CreateAccountUseCase,
    GetAccountUseCase,
    GetAllAccountsUseCase,
  ],
  exports: [
    CreateAccountUseCase,
    GetAccountUseCase,
    GetAllAccountsUseCase,
  ]
})
export class AccountModule { }