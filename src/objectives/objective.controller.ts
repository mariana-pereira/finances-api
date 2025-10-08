import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { z } from 'zod';
import { CurrentUser } from '../auth/current-user-decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserPayload } from '../auth/jwt.strategy';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { ObjectiveService } from './objective.service';

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
