import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import { User } from '@modules/users/model/user';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserUseCase {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password_hash: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserUseCase };
