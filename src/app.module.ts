import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [PrismaService],
})
export class AppModule {}
