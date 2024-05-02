import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInDto } from 'src/dtos/auth/signin.dto';
import { SignUpDto } from 'src/dtos/auth/signup.dto';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: SignUpDto) {
    return this.authService.signup(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() body: SignInDto) {
    return this.authService.login(body);
  }
}