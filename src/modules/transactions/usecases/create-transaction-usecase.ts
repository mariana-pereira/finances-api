import { getRepository } from 'typeorm';

import { Transaction } from '@modules/transactions/model/transaction';

interface Request {
  date: Date;
  amount: number;
  type: string;
  category: string;
  source: string;
  account_id: string;
  user_id: string;
}

class CreateTransactionUseCase {
  public async execute({ date, amount, type, category, source, account_id, user_id }: Request): Promise<Transaction> {
    const transactionsRepository = getRepository(Transaction);

    const transaction = transactionsRepository.create({
      date,
      amount,
      type,
      category,
      source,
      account_id,
      user_id
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export { CreateTransactionUseCase };
