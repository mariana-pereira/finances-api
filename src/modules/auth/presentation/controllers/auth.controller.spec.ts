import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';
import { GetCurrentUserUseCase } from '../../application/use-cases/get-current-user.use-case';

describe('AuthController', () => {
  let controller: AuthController;

  const loginUseCase = {
    execute: jest.fn(),
  };

  const registerUseCase = {
    execute: jest.fn(),
  };

  const getCurrentUserUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: LoginUseCase,
          useValue: loginUseCase,
        },
        {
          provide: RegisterUseCase,
          useValue: registerUseCase,
        },
        {
          provide: GetCurrentUserUseCase,
          useValue: getCurrentUserUseCase,
        },
      ],
    }).compile();

    controller = module.get(AuthController);
  });

  describe('login', () => {
    it('should call LoginUseCase', async () => {
      const dto = {
        email: 'mariana@test.com',
        password: '123456',
      };

      const expected = {
        token: 'jwt-token',
      };

      loginUseCase.execute.mockResolvedValue(expected);

      const result = await controller.login(dto);

      expect(loginUseCase.execute).toHaveBeenCalledTimes(1);
      expect(loginUseCase.execute).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expected);
    });
  });

  describe('register', () => {
    it('should call RegisterUseCase', async () => {
      const dto = {
        name: 'Mariana',
        email: 'mariana@test.com',
        password: '123456',
      };

      const expected = {
        id: '1',
        ...dto,
      };

      registerUseCase.execute.mockResolvedValue(expected);

      const result = await controller.register(dto);

      expect(registerUseCase.execute).toHaveBeenCalledTimes(1);
      expect(registerUseCase.execute).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expected);
    });
  });

  describe('me', () => {
    it('should return current user', async () => {
      const user = {
        sub: '1',
      };

      const expected = {
        id: '1',
        name: 'Mariana',
        email: 'mariana@test.com',
      };

      getCurrentUserUseCase.execute.mockResolvedValue(expected);

      const result = await controller.me(user);

      expect(getCurrentUserUseCase.execute).toHaveBeenCalledTimes(1);
      expect(getCurrentUserUseCase.execute).toHaveBeenCalledWith('1');
      expect(result).toEqual(expected);
    });
  });
});