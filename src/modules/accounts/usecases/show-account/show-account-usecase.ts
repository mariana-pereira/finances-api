import { getRepository } from 'typeorm';

import { Account } from '@modules/accounts/model/account';
import AppError from '@errors/AppError';

interface Request {
  id: string;
}

class ShowAccountUseCase {
  public async execute({ id }: Request): Promise<Account> {
    const accountsRepository = getRepository(Account);

    const account = await accountsRepository.findOne({
      where: { id },
    });

    if (!account) {
      throw new AppError('Account not found.');
    }

    return account;
  }
}

export { ShowAccountUseCase };
