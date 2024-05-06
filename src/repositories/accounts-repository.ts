import { Prisma, Account } from '@prisma/client';

export interface AccountsRepository {
  create(data: Prisma.AccountCreateInput): Promise<Account>
}