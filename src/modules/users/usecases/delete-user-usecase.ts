import { getRepository } from 'typeorm';

import { User } from '@modules/users/model/user';

interface Request {
  id: string;
}

class DeleteUserUseCase {
  public async execute({ id }: Request): Promise<void> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { id }
     });

    if (!user) {
      throw new Error('User not found.');
    }

    await usersRepository.delete(id);
  }
}

export { DeleteUserUseCase };
