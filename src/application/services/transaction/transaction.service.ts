import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from 'src/http/dtos/transaction/createTransaction.dto';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prismaService: PrismaService) {}

  async createTransaction(
    userId: string,
    accountId: string,
    data: CreateTransactionDto,
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
    const transaction = await this.prismaService.transaction.create({
      data: {
        userId,
        accountId,
        ...data,
      },
    });

    return transaction;
  }
}
