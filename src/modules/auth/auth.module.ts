import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Env } from 'src/env';
import { JwtStrategy } from './infra/security/jwt.strategy';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { GetCurrentUserUseCase } from './application/use-cases/get-current-user.use-case';
import { PrismaUserRepository } from './infra/repositories/prisma-user.repository';
import { BcryptHasher } from './infra/security/bcrypt-hasher.service';
import { JwtTokenService } from './infra/security/jwt-token.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AuthController } from './presentation/controllers/auth.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRepository } from './domain/repositories/user.repository';

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
  controllers: [AuthController],
  providers: [
    RegisterUseCase,
    LoginUseCase,
    GetCurrentUserUseCase,
    JwtStrategy,

    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },

    BcryptHasher,
    JwtTokenService,

    JwtAuthGuard,
    PrismaService
  ],
  exports: [
    LoginUseCase,
    RegisterUseCase,
    GetCurrentUserUseCase,
  ],
})
export class AuthModule {}