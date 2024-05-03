import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import * as argon from 'argon2';

import { PrismaService } from 'src/services/prisma.service';

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect.');
    }

    const pwMatches = await argon.verify(user.password, password);

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