import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { RegisterController } from './controllers/register.controller';

@Module({
  imports: [],
  controllers: [RegisterController],
  providers: [PrismaService],
})
export class AppModule {}
