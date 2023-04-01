import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { CreateTargetDto } from 'src/http/dtos/target/create-target.dto';

@Injectable()
export class TargetService {
  constructor(private prismaService: PrismaService) {}

  async createTarget(userId: string, data: CreateTargetDto) {
    const target = await this.prismaService.target.create({
      data: {
        userId,
        ...data,
      },
    });

    return target;
  }
}
