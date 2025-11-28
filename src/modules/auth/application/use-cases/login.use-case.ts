import { UserRepository } from '../../domain/repositories/user.repository';
import { LoginDto } from '../dtos/login.dto';
import { BcryptHasher } from '../../infra/security/bcrypt-hasher.service';
import { JwtTokenService } from '../../infra/security/jwt-token.service';

export class LoginUseCase {
  constructor(
    private users: UserRepository,
    private hasher: BcryptHasher,
    private tokens: JwtTokenService,
  ) {}

  async execute(input: LoginDto) {
    const user = await this.users.findByEmail(input.email);
    if (!user) throw new Error('Invalid credentials');

    const ok = await this.hasher.compare(input.password, user.passwordHash);
    if (!ok) throw new Error('Invalid credentials');

    return { token: this.tokens.generate({ sub: user.id, email: user.email }) };
  }
}