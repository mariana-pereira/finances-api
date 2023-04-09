import { Test, TestingModule } from '@nestjs/testing';
import { AccountTransactionService } from './account-transaction.service';

describe('TransactionService', () => {
  let service: AccountTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountTransactionService],
    }).compile();

    service = module.get<AccountTransactionService>(AccountTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
