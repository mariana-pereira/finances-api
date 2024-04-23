import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';
import { SignInDto } from '../dtos/signin.dto';
import { SignUpDto } from '../dtos/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(data: SignUpDto) {
    try {
      const userExists = await this.prismaService.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (userExists) {
        throw new ForbiddenException('Credentials already taken.');
      }

      const hash = await argon.hash(data.password);

      const user = await this.prismaService.user.create({
        data: {
          email: data.email,
          password: hash,
          name: data.name,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        if (error.message === 'P2002') {
          throw new ForbiddenException('Credentials already taken.');
        }
      }
      throw error;
    }
  }

  async login(data: SignInDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect.');
    }

    const pwMatches = await argon.verify(user.password, data.password);

    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect.');
    }

    return this.signToken(user.id, user.email);
  }


  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.configService.get('JWT_SECRET');

    const token = this.jwtService.sign(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}