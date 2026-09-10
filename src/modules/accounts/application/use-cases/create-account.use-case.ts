import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../../domain/repositories/account.repository';
import { AccountDto } from '../dtos/account.dto';

@Injectable()
export class CreateAccountUseCase {
  constructor(
    private accountRepository: AccountRepository,
  ) {}

  async execute(input: AccountDto) {
    return this.accountRepository.create(input);
  }
}
