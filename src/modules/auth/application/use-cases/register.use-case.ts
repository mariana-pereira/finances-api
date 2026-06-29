import { UserRepository } from '../../domain/repositories/user.repository';
import { RegisterDto } from '../dtos/register.dto';
import { User } from '../../domain/entities/user.entity';
import { BcryptHasher } from '../../infra/security/bcrypt-hasher.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterUseCase {
  constructor(
    private users: UserRepository,
    private hasher: BcryptHasher,
  ) {}

  async execute(input: RegisterDto) {
    const existing = await this.users.findByEmail(input.email);
    if (existing) throw new Error('Email already in use');

    const hash = await this.hasher.hash(input.password);
    // const id = crypto.randomUUID();
    const user = new User(crypto.randomUUID(), input.name, input.email.toLowerCase(), hash);
    return await this.users.create(user);
  }
}