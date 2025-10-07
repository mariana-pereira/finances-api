import { Injectable } from '@nestjs/common';
import { UserPayload } from '../auth/jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { ObjectiveBodySchema } from './objective.controller';

@Injectable()
export class ObjectiveService {
  constructor(private prismaService: PrismaService) {}

  async create(
    objectiveData: ObjectiveBodySchema,
    user: UserPayload
  ) {
    const { name, target_amount } = objectiveData;

    const userId = user.sub;

    const objectiveExists = await this.prismaService.objective.findFirst({
      where: {
        name
      },
    });

    if (objectiveExists) {
      throw new Error('Objective already exists.');
    }

    const data = {
      name,
      target_amount,
      user_id: userId
    }

    const objective = await this.prismaService.objective.create({
      data
    });

    return objective;
  }

  async findAll(user: UserPayload) {
    const userId = user.sub;

    return this.prismaService.objective.findMany({
      where: {
        user_id: userId,
      },
    });
  }
}