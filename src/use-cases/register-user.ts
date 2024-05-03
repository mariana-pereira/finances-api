import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';

import * as argon from 'argon2';

import { PrismaService } from 'src/services/prisma.service';

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserUseCaseRequest) {
    try {
      const userExists = await this.prismaService.user.findUnique({
        where: {
          email: email,
        },
      });

      if (userExists) {
        throw new ForbiddenException('Credentials already taken.');
      }

      const passwordHash = await argon.hash(password);

      const user = await this.prismaService.user.create({
        data: {
          email,
          password: passwordHash,
          name,
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