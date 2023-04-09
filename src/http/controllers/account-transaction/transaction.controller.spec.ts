import { Test, TestingModule } from '@nestjs/testing';
import { AccountTransactionController } from './account-transaction.controller';
import { AccountTransactionService } from 'src/application/services/account-transaction/account-transaction.service';

describe('AccountTransactionController', () => {
  let controller: AccountTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountTransactionController],
      providers: [AccountTransactionService],
    }).compile();

    controller = module.get<AccountTransactionController>(
      AccountTransactionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
