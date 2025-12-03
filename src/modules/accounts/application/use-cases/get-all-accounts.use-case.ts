import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../../domain/repositories/account.repository';

@Injectable()
export class GetAllAccountsUseCase {
  constructor(
    private accountRepository: AccountRepository,
  ) {}

  async execute(userId: string) {
    return this.accountRepository.findAll(userId);
  }
}
