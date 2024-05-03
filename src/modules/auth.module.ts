import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/strategy';
import { SignInController } from 'src/http/controllers/sign-in.controller';
import { SignUpController } from 'src/http/controllers/sign-up.controller';
import { RegisterUserUseCase } from 'src/use-cases/register-user';
import { AuthenticateUserUseCase } from 'src/use-cases/authenticate-user';

@Module({
  imports: [JwtModule.register({})],
  controllers: [SignInController, SignUpController],
  providers: [JwtStrategy, RegisterUserUseCase, AuthenticateUserUseCase],
})
export class AuthModule {}