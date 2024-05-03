import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorators/get-user.decorator';
import { CreateAccountDto } from 'src/dtos/account/create-account.dto';
import { AccountService } from 'src/services/account.service';

@UseGuards(AuthGuard('jwt'))
@Controller('accounts')
export class CreateAccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  async handle(@GetUser('id') userId: string, @Body() data: CreateAccountDto) {
    return this.accountService.createAccount(userId, data);
  }
}