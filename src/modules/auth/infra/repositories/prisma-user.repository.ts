import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const u = await this.prisma.user.findUnique({ where: { email } });
    if (!u) return null;
    return new User(u.id, u.name, u.email, u.password);
  }

  async create(user: User): Promise<User> {
    const data = await this.prisma.user.create({
      data: { id: user.id, name: user.name, email: user.email, password: user.passwordHash },
    });
    return new User(data.id, data.name, data.email, data.password);
  }

  async findById(id: string): Promise<User | null> {
    const u = await this.prisma.user.findUnique({ where: { id } });
    if (!u) return null;
    return new User(u.id, u.name, u.email, u.password);
  }
}