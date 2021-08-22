import { getRepository } from 'typeorm';

import { Investment } from '@modules/investments/model/investment';

interface Request {
  user_id: string;
}

class ListInvestmentsUseCase {
  public async execute({ user_id }: Request): Promise<Investment[]> {
    const investmentsRepository = getRepository(Investment);

    const investments = investmentsRepository.find({ where: { user_id }});

    return investments;
  }
}

export { ListInvestmentsUseCase };
