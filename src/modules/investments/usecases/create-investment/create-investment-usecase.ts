import { getRepository } from 'typeorm';

import { Investment } from '@modules/investments/model/investment';
import { Transaction } from '@modules/transactions/model/transaction';

interface Request {
  name: string;
  type: string;
  tax: string;
  application_date: Date;
  redeem_date: Date;
  amount: number;
  account_id: string;
  target_id: string;
  user_id: string;
}

class CreateInvestmentUseCase {
  public async execute({ name, type, tax, application_date, redeem_date, amount, account_id, target_id, user_id }: Request): Promise<Investment> {
    const investmentsRepository = getRepository(Investment);
    const transactionsRepository = getRepository(Transaction);

    const { sum: totalIncome } = await transactionsRepository
    .createQueryBuilder("transaction")
    .select("SUM(transaction.amount)", "sum")
    .where("transaction.type = :type", { type: "income" })
    .getRawOne();

    const { sum: totalOutcome } = await transactionsRepository
    .createQueryBuilder("transaction")
    .select("SUM(transaction.amount)", "sum")
    .where("transaction.type = :type", { type: "outcome" })
    .getRawOne();

    const accountBalance = totalIncome - totalOutcome;

    if(accountBalance < amount) {
      return;
    }

    const investment = investmentsRepository.create({
      name,
      type,
      tax,
      application_date,
      redeem_date,
      amount,
      account_id,
      target_id,
      user_id
    });

    const transaction = transactionsRepository.create({
      date: application_date,
      amount,
      type: 'outcome',
      category: 'investment',
      source: type,
      account_id,
      user_id
    })

    await investmentsRepository.save(investment);
    await transactionsRepository.save(transaction);

    return investment;
  }
}

export { CreateInvestmentUseCase };
