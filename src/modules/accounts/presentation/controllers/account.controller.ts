import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ZodValidationPipe } from "../../../../common/pipes/zod-validation-pipe";
import { accountSchema } from "../schemas/account.schema";
import { AccountDto } from "../../application/dtos/account.dto";
import { JwtAuthGuard } from "../../../../common/guards/jwt-auth.guard";
import { CreateAccountUseCase } from "../../application/use-cases/create-account.use-case";
import { GetAllAccountsUseCase } from "../../application/use-cases/get-all-accounts.use-case";
import { CurrentUser } from "../../../auth/presentation/decorators/current-user-decorator";
import { JwtPayload } from "../../../auth/types/jwt-payload.type";
import { GetAccountUseCase } from "../../application/use-cases/get-account.use-case";

@Controller('accounts')
export class AccountController {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly getAccountUseCase: GetAccountUseCase,
    private readonly getAllAccountsUseCase: GetAllAccountsUseCase,
  ) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createAccount(
    @Body(new ZodValidationPipe(accountSchema)) body: AccountDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.createAccountUseCase.execute({
      ...body,
      user_id: user.sub,
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllAccounts(
    id: string,
  ) {
    return this.getAllAccountsUseCase.execute(id)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getAccount(
    @Param('id') id: string,
  ) {
    return this.getAccountUseCase.execute(id)
  }
}
