import { getRepository } from 'typeorm';

import Accounts from '@models/Account';

class ListAccountsService {
  public async execute(): Promise<Accounts[]> {
    const accountsRepository = getRepository(Accounts);

    const accounts = accountsRepository.find();

    return accounts;
  }
}

export default ListAccountsService;
