import { Module } from '@nestjs/common';
import { TargetController } from 'src/http/controllers/target/target.controller';
import { TargetService } from '../services/target/target.service';

@Module({
  controllers: [TargetController],
  providers: [TargetService],
})
export class TargetModule {}
