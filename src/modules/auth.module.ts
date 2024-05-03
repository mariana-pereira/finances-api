import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/strategy';
import { AuthService } from '../services/auth.service';
import { SignInController } from 'src/http/controllers/sign-in.controller';
import { SignUpController } from 'src/http/controllers/sign-up.controller';

@Module({
  imports: [JwtModule.register({})],
  controllers: [SignInController, SignUpController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}