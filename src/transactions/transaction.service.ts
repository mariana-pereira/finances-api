import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionBodySchema } from './transaction.controller';

@Injectable()
export class TransactionService {
  constructor(private prismaService: PrismaService) {}

  async create(
    transactionData: TransactionBodySchema
  ) {
    const { type, amount, date, account_id } = transactionData;

    const data = {
      type,
      amount,
      date,
      account_id,
    }

    const transaction = await this.prismaService.transaction.create({
      data
    });

    return transaction;
  }

  // async findAll(user: UserPayload) {
  //   const userId = user.sub;

  //   return this.prismaService.transaction.findMany({
  //     where: {
        
  //     },
  //   });
  // }
}