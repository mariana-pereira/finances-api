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
// import { JwtService } from '@nestjs/jwt';
// import { compare, hash } from 'bcryptjs';
// import { z } from 'zod';
// import { PrismaService } from '../../../../prisma/prisma.service';
// import { loginSchema } from '../schemas/login.schema';
// import { registerSchema } from '../schemas/register.schema';
// import { ZodValidationPipe } from '../../../../common/pipes/zod-validation-pipe';


// type RegisterBodySchema = z.infer<typeof registerSchema>;

// type AuthenticateBodySchema = z.infer<typeof loginSchema>;

// @Controller('/auth')
// export class AuthController {
//   constructor(
//     private prisma: PrismaService,
//     private jwt: JwtService,
//   ) {}

//   @Post('/register')
//   @HttpCode(201)
//   @UsePipes(new ZodValidationPipe(registerSchema))
//   async register(@Body() body: RegisterBodySchema) {
//     const { name, email, password } = body;

//     const userWithSameEmail = await this.prisma.user.findUnique({
//       where: {
//         email,
//       },
//     });

//     if (userWithSameEmail) {
//       throw new ConflictException(
//         'User with same e-mail address already exists.',
//       );
//     }

//     const hashedPassword = await hash(password, 8);

//     await this.prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//       },
//     });
//   }

//   @Post('/signin')
//   @UsePipes(new ZodValidationPipe(loginSchema))
//   async authenticate(@Body() body: AuthenticateBodySchema) {
//     const { email, password } = body;

//     const user = await this.prisma.user.findUnique({
//       where: {
//         email,
//       },
//     });

//     if (!user) {
//       throw new UnauthorizedException('User credentials do not match.');
//     }

//     const isPasswordValid = await compare(password, user.password);

//     if (!isPasswordValid) {
//       throw new UnauthorizedException('User credentials do not match.');
//     }

//     const accessToken = this.jwt.sign({ sub: user.id });

//     return {
//       access_token: accessToken,
//     };
//   }
// }



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