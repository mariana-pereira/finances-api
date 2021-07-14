import { getRepository } from 'typeorm';

import Account from '@models/Account';

interface Request {
  id: string;
}

class ShowAccountService {
  public async execute({ id }: Request): Promise<Account> {
    const accountsRepository = getRepository(Account);

    const account = await accountsRepository.findOne({
      where: { id }
     });

    if (!account) {
      throw new Error('Account not found.');
    }

    return account;
  }
}

export default ShowAccountService;
