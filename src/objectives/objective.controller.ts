import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { z } from 'zod';
import { ObjectiveService } from './objective.service';
import { UserPayload } from '../modules/auth/infra/security/jwt.strategy';
import { CurrentUser } from '../modules/auth/presentation/decorators/current-user-decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation-pipe';

const objectiveBodySchema = z.object({
  name: z.string(),
  target_amount: z.number(),
});

const bodyValidationPipe = new ZodValidationPipe(objectiveBodySchema);

export type ObjectiveBodySchema = z.infer<typeof objectiveBodySchema>;

@Controller('/objectives')
@UseGuards(JwtAuthGuard)
export class ObjectiveController {
  constructor(private readonly objectiveService: ObjectiveService) {}

  @Post()
  async create(
    @Body(bodyValidationPipe) body: ObjectiveBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    return this.objectiveService.create(body, user);
  }

  @Get()
  async findAll(@CurrentUser() user: UserPayload,) {
    return this.objectiveService.findAll(user);
  }
}
