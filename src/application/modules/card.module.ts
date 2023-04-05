import { Module } from '@nestjs/common';
import { CardController } from 'src/http/controllers/card/card.controller';
import { CardService } from '../services/card/card.service';

@Module({
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
