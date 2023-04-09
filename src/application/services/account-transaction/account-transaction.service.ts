import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAccountTransactionDto } from 'src/http/dtos/account-transaction/createAccountTransaction.dto';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class AccountTransactionService {
  constructor(private prismaService: PrismaService) {}

  async createTransaction(
    userId: string,
    accountId: string,
    data: CreateAccountTransactionDto,
  ) {
    try {
      const accountExists = await this.prismaService.account.findFirst({
        where: {
          id: accountId,
        },
      });

      if (!accountExists) {
        throw new ForbiddenException('Account not found.');
      }
    } catch (error) {
      console.log(error);
    }
    const accountTransaction =
      await this.prismaService.accountTransaction.create({
        data: {
          userId,
          accountId,
          ...data,
        },
      });

    return accountTransaction;
  }
}
