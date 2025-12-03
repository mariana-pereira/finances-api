import { Account } from "../entities/account.entity";


export abstract class AccountRepository {
  abstract create(account: Account): Promise<Account>;
  abstract findById(id: string): Promise<Account | null>;
  abstract findAll(userId: string): Promise<Account[] | null>;
}