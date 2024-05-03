import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInDto } from 'src/dtos/auth/signin.dto';
import { AuthenticateUserUseCase } from 'src/use-cases/authenticate-user';

@Controller('auth')
export class SignInController {
  constructor(private authenticateUser: AuthenticateUserUseCase) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  handle(@Body() body: SignInDto) {
    return this.authenticateUser.execute(body);
  }
}