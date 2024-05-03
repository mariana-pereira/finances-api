import { Module } from '@nestjs/common';
import { CreateAccountController } from 'src/http/controllers/create-account.controller';
import { AccountService } from 'src/services/account.service';

@Module({
  controllers: [CreateAccountController],
  providers: [AccountService],
})
export class AccountModule {}