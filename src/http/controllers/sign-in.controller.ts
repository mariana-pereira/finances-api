import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInDto } from 'src/dtos/auth/signin.dto';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class SignInController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  handle(@Body() body: SignInDto) {
    return this.authService.login(body);
  }
}