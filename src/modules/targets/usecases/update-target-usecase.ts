import { getRepository } from 'typeorm';

import { Target } from '@modules/targets/model/target';

interface Request {
  id: string;
  name: string;
  deadline: Date;
  necessary_amount: number;
}

class UpdateTargetUseCase {
  public async execute({
    id,
    name,
    deadline,
    necessary_amount
  }: Request): Promise<Target> {
    const targetsRepository = getRepository(Target);

    const target = await targetsRepository.findOne({
      where: { id }
     });

    if (!target) {
      throw new Error('Target not found.');
    }

    const updatedTarget = targetsRepository.merge(target, { name, deadline, necessary_amount });

    await targetsRepository.save(updatedTarget);

    return updatedTarget;
  }
}

export { UpdateTargetUseCase };
