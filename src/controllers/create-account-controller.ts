import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { AuthGuard } from '@nestjs/passport';
// import { GetUser } from 'src/auth/decorators';
// import { AccountService } from 'src/application/services/account/account.service';
// import { CreateAccountDto } from 'src/http/dtos/account';

//@UseGuards(AuthGuard('jwt'))
@Controller('accounts')
export class AccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: any) {
    const { name, email, password } = body;

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new ConflictException(
        'User with same e-mail address already exists.'
      );
    }

    await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
}
