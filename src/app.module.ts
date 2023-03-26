import { Module } from '@nestjs/common';
import { UserModule } from './application/modules/user.module';
import { AuthModule } from './application/modules/auth.module';

@Module({
  imports: [UserModule, AuthModule],
})
export class AppModule {}
