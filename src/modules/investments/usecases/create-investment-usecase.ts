import { getRepository } from 'typeorm';

import { Investment } from '@modules/investments/model/investment';

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

    await investmentsRepository.save(investment);

    return investment;
  }
}

export { CreateInvestmentUseCase };
