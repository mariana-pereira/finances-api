import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CreateCardUseCase } from "../../application/use-cases/create-card.use-case";
import { GetCardUseCase } from "../../application/use-cases/get-card.use-case";
import { GetAllCardsUseCase } from "../../application/use-cases/get-all-cards.use-case";
import { JwtAuthGuard } from "../../../../common/guards/jwt-auth.guard";
import { CurrentUser } from "../../../auth/presentation/decorators/current-user-decorator";
import { ZodValidationPipe } from "../../../../common/pipes/zod-validation-pipe";
import { cardSchema } from "../schemas/card.schema";
import { CardDto } from "../../application/dtos/card.dto";
import { JwtPayload } from "../../../auth/types/jwt-payload.type";

@Controller('cards')
export class CardController {
  constructor(
    private readonly createCardUseCase: CreateCardUseCase,
    private readonly getCardUseCase: GetCardUseCase,
    private readonly getAllCardsUseCase: GetAllCardsUseCase,
  ) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createCard(
    @Body(new ZodValidationPipe(cardSchema)) body: CardDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.createCardUseCase.execute({
      ...body,
      user_id: user.sub,
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllCards(
    id: string,
  ) {
    return this.getAllCardsUseCase.execute(id)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getCard(
    @Param('id') id: string,
  ) {
    return this.getCardUseCase.execute(id)
  }
}
