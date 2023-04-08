import { Test, TestingModule } from '@nestjs/testing';
import { CardTransactionController } from './card-transaction.controller';
import { CardTransactionService } from 'src/application/services/card-transaction/card-transaction.service';

describe('CardTransactionController', () => {
  let controller: CardTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardTransactionController],
      providers: [CardTransactionService],
    }).compile();

    controller = module.get<CardTransactionController>(
      CardTransactionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
