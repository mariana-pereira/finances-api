import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './modules/user.module';

@Module({
  imports: [UserModule],
  providers: [AppService, PrismaService],
})
export class AppModule {}
