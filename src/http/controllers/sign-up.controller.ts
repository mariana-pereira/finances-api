import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from 'src/dtos/auth/signup.dto';
import { RegisterUserUseCase } from 'src/use-cases/register-user';

@Controller('auth')
export class SignUpController {
  constructor(private registerUser: RegisterUserUseCase) {}

  @Post('signup')
  handle(@Body() body: SignUpDto) {
    return this.registerUser.execute(body);
  }
}