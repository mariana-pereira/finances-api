import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../../domain/repositories/account.repository';

@Injectable()
export class GetAccountUseCase {
  constructor(
    private accountRepository: AccountRepository,
  ) {}

  async execute(id: string) {
    return this.accountRepository.findById(id);
  }
}