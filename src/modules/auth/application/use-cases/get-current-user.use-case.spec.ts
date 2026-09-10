import { GetCurrentUserUseCase } from './get-current-user.use-case';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

describe('GetCurrentUserUseCase', () => {
  let useCase: GetCurrentUserUseCase;

  const users = {
    findById: jest.fn(),
  } as unknown as jest.Mocked<UserRepository>;

  beforeEach(() => {
    jest.clearAllMocks();

    useCase = new GetCurrentUserUseCase(users);
  });

  it('should return current user', async () => {
    const user = new User(
      '1',
      'Mariana',
      'mariana@test.com',
      'hash',
    );

    users.findById.mockResolvedValue(user);

    const result = await useCase.execute('1');

    expect(users.findById).toHaveBeenCalledWith('1');
    expect(result).toEqual(user);
  });

  it('should return null when user does not exist', async () => {
    users.findById.mockResolvedValue(null);

    const result = await useCase.execute('1');

    expect(result).toBeNull();
  });
});