import { getRepository } from 'typeorm';

import { Account } from '@modules/accounts/model/account';

interface Request {
  user_id: string;
}

class ListAccountsUseCase {
  public async execute({ user_id }: Request): Promise<Account[]> {
    const accountsRepository = getRepository(Account);

    const accounts = accountsRepository.find({ where: { user_id }});

    return accounts;
  }
}

export { ListAccountsUseCase };
