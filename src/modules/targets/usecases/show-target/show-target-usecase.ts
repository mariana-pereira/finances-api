import { getRepository } from 'typeorm';

import { Target } from '@modules/targets/model/target';
import AppError from '@errors/AppError';

interface Request {
  id: string;
}

class ShowTargetUseCase {
  public async execute({ id }: Request): Promise<Target> {
    const targetsRepository = getRepository(Target);

    const target = await targetsRepository.findOne({
      where: { id },
    });

    if (!target) {
      throw new AppError('Target not found.');
    }

    return target;
  }
}

export { ShowTargetUseCase };
