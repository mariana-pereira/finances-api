import { JwtStrategy } from '../auth/strategy';
import { RegisterUserUseCase } from 'src/use-cases/register-user';
import { AuthenticateUserUseCase } from 'src/use-cases/authenticate-user';
import { RegisterController } from 'src/http/controllers/register.controller';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Env } from 'src/env';
import { AuthenticateController } from 'src/http/controllers/authenticate.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        const privateKey = config.get('JWT_PRIVATE_KEY', { infer: true });
        const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true });

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        };
      },
    }),
  ],
  controllers: [AuthenticateController, RegisterController],
  providers: [JwtStrategy, RegisterUserUseCase, AuthenticateUserUseCase],
})
export class AuthModule {}