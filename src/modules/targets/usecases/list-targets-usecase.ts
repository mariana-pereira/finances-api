import { getRepository } from 'typeorm';

import { Target } from '@modules/targets/model/target';

interface Request {
  user_id: string;
}

class ListTargetsUseCase {
  public async execute({ user_id }: Request): Promise<Target[]> {
    const targetsRepository = getRepository(Target);

    const targets = targetsRepository.find({ where: { user_id }});

    return targets;
  }
}

export { ListTargetsUseCase };
