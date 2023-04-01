import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators';
import { CreateTargetDto } from 'src/http/dtos/target/create-target.dto';
import { TargetService } from 'src/application/services/target/target.service';

@UseGuards(AuthGuard('jwt'))
@Controller('targets')
export class TargetController {
  constructor(private targetService: TargetService) {}

  @Post()
  createTarget(@GetUser('id') userId: string, @Body() data: CreateTargetDto) {
    return this.targetService.createTarget(userId, data);
  }
}
