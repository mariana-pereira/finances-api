import { getRepository } from 'typeorm';

import Account from '@models/Account';

interface Request {
  bank: string;
  branch: string;
  account_number: string;
  account_type: string;
  user_id: string;
}

class CreateAccountService {
  public async execute({ bank, branch, account_number, account_type, user_id }: Request): Promise<Account> {
    const accountsRepository = getRepository(Account);

    const account = accountsRepository.create({
      bank,
      branch,
      account_number,
      account_type,
      user_id
    });

    await accountsRepository.save(account);

    return account;
  }
}

export default CreateAccountService;
