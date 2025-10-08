import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ObjectiveController } from './objective.controller';
import { ObjectiveService } from './objective.service';

@Module({
  controllers: [ObjectiveController],
  providers: [ObjectiveService, PrismaService],

})
export class ObjectiveModule {}
