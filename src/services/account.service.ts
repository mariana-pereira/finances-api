import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateAccountDto } from '../dtos/account/create-account.dto';

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