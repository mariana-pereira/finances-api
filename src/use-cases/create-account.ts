import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GetUser } from 'src/decorators/get-user.decorator';
import { AccountsRepository } from 'src/repositories/accounts-repository';



interface CreateAccountUseCaseRequest {
  bank: string
  branch: number
  accountNumber: string
}

@Injectable()
export class CreateAccountUseCase {
  constructor(private accountsRepository: AccountsRepository) {}

  async execute({
    bank,
    branch,
    accountNumber,
  }: CreateAccountUseCaseRequest) {
    try {
      const account = await this.accountsRepository.create({
        User: this.userId,
        bank,
        branch,
        accountNumber,
      });

      return account;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        if (error.message === 'P2002') {
          throw new ForbiddenException('Credentials already taken.');
        }
      }
      throw error;
    }
  }
}