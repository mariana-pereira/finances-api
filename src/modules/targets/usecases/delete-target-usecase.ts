import { getRepository } from 'typeorm';

import { Target } from '@modules/targets/model/target';

interface Request {
  id: string;
}

class DeleteTargetUseCase {
  public async execute({ id }: Request): Promise<void> {
    const targetsRepository = getRepository(Target);

    const target = await targetsRepository.findOne({
      where: { id }
     });

    if (!target) {
      throw new Error('Target not found.');
    }

    await targetsRepository.delete(id);
  }
}

export { DeleteTargetUseCase };