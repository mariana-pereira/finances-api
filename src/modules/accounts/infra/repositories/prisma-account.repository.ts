import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { AccountDto } from '../../application/dtos/account.dto';
import { Account } from '../../domain/entities/account.entity';

@Injectable()
export class PrismaAccountRepository implements AccountRepository {
  constructor(private prisma: PrismaService) { }

  async create(account: AccountDto): Promise<Account> {
    const data = await this.prisma.account.create({
      data: {
        id: account.id,
        bank: account.bank,
        branch: account.branch,
        account_number: account.account_number,
        user_id: account.user_id
      },
    });
    return new Account(data.id, data.bank, data.branch, data.account_number, data.user_id);
  }

  async findById(id: string): Promise<Account | null> {
    const acc = await this.prisma.account.findUnique({ where: { id } });
    if (!acc) return null;
    return new Account(acc.id, acc.bank, acc.branch, acc.account_number, acc.user_id);
  }

  async findAll(userId: string): Promise<Account[] | null> {
    const data = await this.prisma.account.findMany({ where: { user_id: userId } });
    if (!data) return null;

    return data.map(
      (acc) =>
        new Account(
          acc.id,
          acc.bank,
          acc.branch,
          acc.account_number,
          acc.user_id,
        ),
    );
  }
}
