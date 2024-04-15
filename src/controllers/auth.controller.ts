import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDto } from '../dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: AuthDto) {
    return this.authService.signup(body);
  }
}