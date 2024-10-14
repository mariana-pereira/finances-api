import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { z } from 'zod';
import { CurrentUser } from '../auth/current-user-decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserPayload } from '../auth/jwt.strategy';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { AccountService } from './account.service';

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
}
