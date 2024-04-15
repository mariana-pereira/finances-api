import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';
import { AuthDto } from '../dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(data: AuthDto) {
    try {
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