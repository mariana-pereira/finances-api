import { Injectable } from '@nestjs/common';
import { UserPayload } from '../auth/jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { AccountBodySchema } from './account.controller';

@Injectable()
export class AccountService {
  constructor(private prismaService: PrismaService) {}

  async create(
    accountData: AccountBodySchema,
    user: UserPayload
  ) {
    const { bank, branch, account_number } = accountData;

    const userId = user.sub;

    const accountsExists = await this.prismaService.account.findFirst({
      where: {
        account_number: account_number,
      },
    });

    if (accountsExists) {
      throw new Error('Account already exists.');
    }

    const data = {
      bank,
      branch,
      account_number,
      user_id: userId
    }

    const account = await this.prismaService.account.create({
      data
    });

    return account;
  }

  // async findAll() {
  //   return this.prismaService.book.findMany();
  // }

  // async update(id: string, data: BookDto) {
  //   const bookExists = await this.prismaService.book.findUnique({
  //     where: {
  //       id,
  //     },
  //   });

  //   if (!bookExists) {
  //     throw new Error('Book does not exist.');
  //   }

  //   return await this.prismaService.book.update({
  //     data,
  //     where: {
  //       id,
  //     },
  //   });
  // }

  // async delete(id: string) {
  //   const bookExists = await this.prismaService.book.findUnique({
  //     where: {
  //       id,
  //     },
  //   });

  //   if (!bookExists) {
  //     throw new Error('Book does not exist.');
  //   }

  //   return await this.prismaService.book.delete({
  //     where: {
  //       id,
  //     },
  //   });
  // }
}