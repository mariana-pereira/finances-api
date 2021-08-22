import { getRepository } from 'typeorm';

import { Account } from '@modules/accounts/model/account';

interface Request {
  id: string;
}

class DeleteAccountUseCase {
  public async execute({ id }: Request): Promise<void> {
    const accountsRepository = getRepository(Account);

    const account = await accountsRepository.findOne({
      where: { id }
     });

    if (!account) {
      throw new Error('Account not found.');
    }

    await accountsRepository.delete(id);
  }
}

export { DeleteAccountUseCase };
