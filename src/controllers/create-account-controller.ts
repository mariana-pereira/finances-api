import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../decorators/get-user.decorator';
import { CreateAccountDto } from '../dtos/account/create-account.dto';
import { AccountService } from '../services/account.service';

@UseGuards(AuthGuard('jwt'))
@Controller('accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  createAccount(@GetUser('id') userId: string, @Body() data: CreateAccountDto) {
    return this.accountService.createAccount(userId, data);
  }
}