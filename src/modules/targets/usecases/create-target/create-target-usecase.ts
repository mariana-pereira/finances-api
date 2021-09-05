import { getRepository } from 'typeorm';

import { Target } from '@modules/targets/model/target';

interface Request {
  name: string;
  deadline: Date;
  necessary_amount: number;
  user_id: string;
}

class CreateTargetUseCase {
  public async execute({ name, deadline, necessary_amount, user_id }: Request): Promise<Target> {
    const targetsRepository = getRepository(Target);

    const target = targetsRepository.create({
      name,
      deadline,
      necessary_amount,
      user_id,
    });

    await targetsRepository.save(target);

    return target;
  }
}

export { CreateTargetUseCase };
