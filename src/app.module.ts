import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  providers: [AppService, PrismaService],
})
export class AppModule {}
