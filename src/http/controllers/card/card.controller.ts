import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CardService } from 'src/application/services/card/card.service';
import { GetUser } from 'src/auth/decorators';
import { CreateCardDto } from 'src/http/dtos/card';

@UseGuards(AuthGuard('jwt'))
@Controller('cards')
export class CardController {
  constructor(private cardService: CardService) {}

  @Post()
  createCard(@GetUser('id') userId: string, @Body() data: CreateCardDto) {
    return this.cardService.createCard(userId, data);
  }
}
