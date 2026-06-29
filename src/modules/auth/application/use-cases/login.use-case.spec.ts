import { LoginUseCase } from './login.use-case';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { BcryptHasher } from '../../infra/security/bcrypt-hasher.service';
import { JwtTokenService } from '../../infra/security/jwt-token.service';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;

  const users = {
    findByEmail: jest.fn(),
  } as unknown as jest.Mocked<UserRepository>;

  const hasher = {
    compare: jest.fn(),
  } as unknown as jest.Mocked<BcryptHasher>;

  const tokens = {
    generate: jest.fn(),
  } as unknown as jest.Mocked<JwtTokenService>;

  beforeEach(() => {
    jest.clearAllMocks();

    useCase = new LoginUseCase(
      users,
      hasher,
      tokens,
    );
  });

  it('should login successfully', async () => {
    const user = new User(
      '1',
      'Mariana',
      'mariana@test.com',
      'hashed-password',
    );

    users.findByEmail.mockResolvedValue(user);
    hasher.compare.mockResolvedValue(true);
    tokens.generate.mockReturnValue('jwt-token');

    const result = await useCase.execute({
      email: 'mariana@test.com',
      password: '123456',
    });

    expect(users.findByEmail).toHaveBeenCalledWith(
      'mariana@test.com',
    );

    expect(hasher.compare).toHaveBeenCalledWith(
      '123456',
      'hashed-password',
    );

    expect(tokens.generate).toHaveBeenCalledWith({
      sub: '1',
      email: 'mariana@test.com',
    });

    expect(result).toEqual({
      token: 'jwt-token',
    });
  });

  it('should throw when user does not exist', async () => {
    users.findByEmail.mockResolvedValue(null);

    await expect(
      useCase.execute({
        email: 'mariana@test.com',
        password: '123456',
      }),
    ).rejects.toThrow('Invalid credentials');
  });

  it('should throw when password is invalid', async () => {
    const user = new User(
      '1',
      'Mariana',
      'mariana@test.com',
      'hashed-password',
    );

    users.findByEmail.mockResolvedValue(user);
    hasher.compare.mockResolvedValue(false);

    await expect(
      useCase.execute({
        email: 'mariana@test.com',
        password: 'wrong-password',
      }),
    ).rejects.toThrow('Invalid credentials');
  });
});