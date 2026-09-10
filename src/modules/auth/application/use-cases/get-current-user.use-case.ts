import { Inject } from "@nestjs/common";
import { UserRepository } from "../../domain/repositories/user.repository";

export class GetCurrentUserUseCase {
  constructor(@Inject(UserRepository) private readonly users: UserRepository) {}

  async execute(userId: string) {
    return await this.users.findById(userId);
  }
}