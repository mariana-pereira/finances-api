import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { hash } from 'bcryptjs';
import { z } from 'zod';

import { PrismaService } from '../prisma/prisma.service';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

const registerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type RegisterBodySchema = z.infer<typeof registerBodySchema>

@Controller('/auth')
export class RegisterController {
  constructor(private prisma: PrismaService) {}

  @Post('register')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerBodySchema))
  async handle(@Body() body: RegisterBodySchema) {
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
}