import { getRepository } from 'typeorm';

import { Transaction } from '@modules/transactions/model/transaction';

interface Request {
  user_id: string;
}

class ListTransactionsUseCase {
  public async execute({ user_id }: Request): Promise<Transaction[]> {
    const transactionsRepository = getRepository(Transaction);

    const transactions = transactionsRepository.find({ where: { user_id }});

    return transactions;
  }
}

export { ListTransactionsUseCase };
