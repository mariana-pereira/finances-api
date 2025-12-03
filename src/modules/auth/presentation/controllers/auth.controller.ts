import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';
import { GetCurrentUserUseCase } from '../../application/use-cases/get-current-user.use-case';
import { LoginDto } from '../../application/dtos/login.dto';
import { loginSchema } from '../schemas/login.schema';
import { ZodValidationPipe } from '../../../../common/pipes/zod-validation-pipe';
import { registerSchema } from '../schemas/register.schema';
import { RegisterDto } from '../../application/dtos/register.dto';
import { JwtAuthGuard } from '../../../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user-decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly getCurrentUserUseCase: GetCurrentUserUseCase,
  ) {}

  @Post('login')
  async login(@Body(new ZodValidationPipe(loginSchema)) body: LoginDto) {
    return this.loginUseCase.execute(body);
  }

  @Post('register')
  async register(@Body(new ZodValidationPipe(registerSchema)) body: RegisterDto) {
    return this.registerUseCase.execute(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@CurrentUser() user: { sub: string }) {
    return this.getCurrentUserUseCase.execute(user.sub);
  }
}