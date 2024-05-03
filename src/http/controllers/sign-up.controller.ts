import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from 'src/dtos/auth/signup.dto';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class SignUpController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  handle(@Body() body: SignUpDto) {
    return this.authService.signup(body);
  }
}