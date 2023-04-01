import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { CreateAccountDto } from 'src/http/dtos/account';

@Injectable()
export class AccountService {
  constructor(private prismaService: PrismaService) {}

  async createAccount(userId: string, data: CreateAccountDto) {
    const account = await this.prismaService.account.create({
      data: {
        userId,
        ...data,
      },
    });

    return account;
  }
}
