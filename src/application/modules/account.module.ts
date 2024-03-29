import { Module } from '@nestjs/common';
import { AccountController } from 'src/http/controllers/account/account.controller';
import { AccountService } from '../services/account/account.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
