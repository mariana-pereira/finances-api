import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/get-user.decorator';
import { CreateAccountDto } from 'src/dtos/account/create-account.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { CreateAccountUseCase } from 'src/use-cases/create-account';
import { z } from 'zod';

const createAccountBodySchema = z.object({
  bank: z.string(),
  branch: z.number(),
  accountNumber: z.string()
});

const bodyValidationPipe = new ZodValidationPipe(createAccountBodySchema);

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('accounts')
@UseGuards(AuthGuard('jwt'))
export class CreateAccountController {
  constructor(private createAccount: CreateAccountUseCase, @GetUser('id') userId: string) {}

  @Post()
  async handle(@Body() body: CreateAccountBodySchema) {
    const { bank, branch, accountNumber } = body;

    return this.createAccount.execute({ bank, branch, accountNumber, userId });
  }
}