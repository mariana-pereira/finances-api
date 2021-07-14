import { getRepository } from 'typeorm';

import Account from '@models/Account';

interface Request {
  id: string;
  bank: string;
  branch: string;
  account_number: string;
  account_type: string;
}

class UpdateAccountService {
  public async execute({
    id,
    bank,
    branch,
    account_number,
    account_type
  }: Request): Promise<Account> {
    const accountsRepository = getRepository(Account);

    const account = await accountsRepository.findOne({
      where: { id }
     });

    if (!account) {
      throw new Error('Account not found.');
    }

    const updatedAccount = accountsRepository.merge(account, { bank, branch, account_number, account_type });

    await accountsRepository.save(updatedAccount);

    return updatedAccount;
  }
}

export default UpdateAccountService;
