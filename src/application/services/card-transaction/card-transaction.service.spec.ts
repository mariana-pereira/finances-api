import { Test, TestingModule } from '@nestjs/testing';
import { CardTransactionService } from './card-transaction.service';

describe('CardTransactionService', () => {
  let service: CardTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardTransactionService],
    }).compile();

    service = module.get<CardTransactionService>(CardTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
