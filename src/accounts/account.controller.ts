import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { z } from 'zod';
import { AccountService } from './account.service';
import { UserPayload } from '../modules/auth/infra/security/jwt.strategy';
import { CurrentUser } from '../modules/auth/presentation/decorators/current-user-decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation-pipe';

const accountBodySchema = z.object({
  bank: z.string(),
  branch: z.string(),
  account_number: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(accountBodySchema);

export type AccountBodySchema = z.infer<typeof accountBodySchema>;

@Controller('/accounts')
@UseGuards(JwtAuthGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async create(
    @Body(bodyValidationPipe) body: AccountBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    return this.accountService.create(body, user);
  }

  @Get()
  async findAll(@CurrentUser() user: UserPayload,) {
    return this.accountService.findAll(user);
  }
}
