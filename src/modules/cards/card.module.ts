import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Env } from '../../env';
import { JwtStrategy } from '../auth/infra/security/jwt.strategy';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CardController } from './presentation/controllers/card.controller';
import { CardRepository } from './domain/repositories/card.repository';
import { PrismaCardRepository } from './infra/repositories/prisma-card.repository';
import { CreateCardUseCase } from './application/use-cases/create-card.use-case';
import { GetCardUseCase } from './application/use-cases/get-card.use-case';
import { GetAllCardsUseCase } from './application/use-cases/get-all-cards.use-case';

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
  controllers: [CardController],
  providers: [
    PrismaService,
    JwtStrategy,
    JwtAuthGuard,

    {
      provide: CardRepository,
      useClass: PrismaCardRepository,
    },

    CreateCardUseCase,
    GetCardUseCase,
    GetAllCardsUseCase,
  ],
  exports: [
    CreateCardUseCase,
    GetCardUseCase,
    GetAllCardsUseCase,
  ]
})
export class CardModule { }
