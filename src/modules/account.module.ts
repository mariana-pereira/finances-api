import { Module } from '@nestjs/common';
import { AccountController } from 'src/http/controllers/account.controller';
import { AccountService } from 'src/services/account.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}