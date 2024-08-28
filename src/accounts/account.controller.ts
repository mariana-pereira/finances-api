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
import { PrismaService } from '../prisma/prisma.service';

const accountBodySchema = z.object({
  bank: z.string(),
  branch: z.string(),
  account_number: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(accountBodySchema);

type AccountBodySchema = z.infer<typeof accountBodySchema>;

@Controller('/accounts')
@UseGuards(JwtAuthGuard)
export class AccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async create(
    @Body(bodyValidationPipe) body: AccountBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { bank, branch, account_number } = body;

    const userId = user.sub;

    // const accountsExists = await this.prismaService.account.findFirst({
    //   where: {
    //     account_number: account_number,
    //   },
    // });

    // if (accountsExists) {
    //   throw new Error('Account already exists.');
    // }

    const data = {
      bank,
      branch,
      account_number,
      user_id: userId
    }

    const account = await this.prisma.account.create({
      data
    });

    return account;
  }
}
