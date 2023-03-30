import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators';
import { AccountService } from 'src/application/services/account/account.service';
import { CreateAccountDto } from 'src/http/dtos/account';

@UseGuards(AuthGuard('jwt'))
@Controller('accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  createAccount(@GetUser('id') userId: string, @Body() data: CreateAccountDto) {
    return this.accountService.createAccount(userId, data);
  }
}
