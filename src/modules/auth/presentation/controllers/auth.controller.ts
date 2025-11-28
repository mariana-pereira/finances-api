import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { z } from 'zod';
import { PrismaService } from '../../../../prisma/prisma.service';
import { ZodValidationPipe } from '../../../../pipes/zod-validation-pipe';
import { loginSchema } from '../schemas/login.schema';
import { registerSchema } from '../schemas/register.schema';


type RegisterBodySchema = z.infer<typeof registerSchema>;

type AuthenticateBodySchema = z.infer<typeof loginSchema>;

@Controller('/auth')
export class AuthController {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  @Post('/register')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerSchema))
  async register(@Body() body: RegisterBodySchema) {
    const { name, email, password } = body;

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new ConflictException(
        'User with same e-mail address already exists.',
      );
    }

    const hashedPassword = await hash(password, 8);

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }

  @Post('/signin')
  @UsePipes(new ZodValidationPipe(loginSchema))
  async authenticate(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User credentials do not match.');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('User credentials do not match.');
    }

    const accessToken = this.jwt.sign({ sub: user.id });

    return {
      access_token: accessToken,
    };
  }
}
