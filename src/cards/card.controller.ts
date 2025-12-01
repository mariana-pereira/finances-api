import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { z } from 'zod';
import { CardService } from './card.service';
import { UserPayload } from '../modules/auth/infra/security/jwt.strategy';
import { CurrentUser } from '../modules/auth/presentation/decorators/current-user-decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation-pipe';

const cardBodySchema = z.object({
  name: z.string(),
  card_number: z.string(),
  expiration: z.string().datetime(),
  emitter: z.string(),
  account_id: z.string().uuid(),
});

const bodyValidationPipe = new ZodValidationPipe(cardBodySchema);

export type CardBodySchema = z.infer<typeof cardBodySchema>;

@Controller('/cards')
@UseGuards(JwtAuthGuard)
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  async create(
    @Body(bodyValidationPipe) body: CardBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    return this.cardService.create(body, user);
  }

  @Get()
  async findAll(@CurrentUser() user: UserPayload,) {
    return this.cardService.findAll(user);
  }
}
