import { RegisterUseCase } from './register.use-case';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { BcryptHasher } from '../../infra/security/bcrypt-hasher.service';

describe('RegisterUseCase', () => {
  let useCase: RegisterUseCase;

  const users = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  } as unknown as jest.Mocked<UserRepository>;

  const hasher = {
    hash: jest.fn(),
  } as unknown as jest.Mocked<BcryptHasher>;

  beforeEach(() => {
    jest.clearAllMocks();

    useCase = new RegisterUseCase(
      users,
      hasher,
    );
  });

  it('should register a user', async () => {
    users.findByEmail.mockResolvedValue(null);
    hasher.hash.mockResolvedValue('hashed-password');

    console.log(process.version);
console.log(typeof crypto);
console.log(globalThis.crypto);

    const createdUser = new User(
      '1',
      'Mariana',
      'mariana@test.com',
      'hashed-password',
    );

    users.create.mockResolvedValue(createdUser);

    const result = await useCase.execute({
      name: 'Mariana',
      email: 'Mariana@Test.com',
      password: '123456',
    });

    expect(users.findByEmail).toHaveBeenCalledWith(
      'Mariana@Test.com',
    );

    expect(hasher.hash).toHaveBeenCalledWith(
      '123456',
    );

    expect(users.create).toHaveBeenCalled();

    expect(result).toEqual(createdUser);
  });

  it('should throw when email already exists', async () => {
    users.findByEmail.mockResolvedValue(
      new User(
        '1',
        'Mariana',
        'mariana@test.com',
        'hash',
      ),
    );

    await expect(
      useCase.execute({
        name: 'Mariana',
        email: 'mariana@test.com',
        password: '123456',
      }),
    ).rejects.toThrow('Email already in use');
  });
});