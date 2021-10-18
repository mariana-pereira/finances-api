import { getRepository, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';

import { Transaction } from '@modules/transactions/model/transaction';

interface Request {
  type: any;
  category: any;
  source: any;
  start_date: any;
  end_date: any;
}

class FilterTransactionsUseCase {
  public async execute({ type, category, source, start_date, end_date }: Request): Promise<Transaction[]> {
    const transactionsRepository = getRepository(Transaction);

    let transactions: Transaction[];

    if(type) {
      transactions = await transactionsRepository.find({ where: { type, date: MoreThanOrEqual(start_date) && LessThanOrEqual(end_date) }});
    }

    if(category) {
      transactions = await transactionsRepository.find({ where: { category, date: MoreThanOrEqual(start_date) && LessThanOrEqual(end_date) }});
    }

    if(source) {
      transactions = await transactionsRepository.find({ where: { source, date: MoreThanOrEqual(start_date) && LessThanOrEqual(end_date) }});
    }

    return transactions;
  }
}

export { FilterTransactionsUseCase };
