import { getRepository } from 'typeorm';

import { Account } from '@modules/accounts/model/account';

class ListAccountsUseCase {
  public async execute(): Promise<Account[]> {
    const accountsRepository = getRepository(Account);

    const accounts = accountsRepository.find();

    return accounts;
  }
}

export { ListAccountsUseCase };
