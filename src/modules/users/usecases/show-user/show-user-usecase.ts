import { getRepository } from 'typeorm';

import { User } from '@modules/users/model/user';
import AppError from '@errors/AppError';

interface Request {
  id: string;
}

class ShowUserUseCase {
  public async execute({ id }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}

export { ShowUserUseCase };
