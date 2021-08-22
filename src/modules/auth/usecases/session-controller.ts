import { Request, Response } from 'express';
import * as Yup from 'yup';

import { AuthenticateUserUseCase } from './authenticate-user-usecase';

class SessionController {
  public async store (request: Request, response: Response): Promise<Response> {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6)
    });

    try {
      await schema.validate(request.body);

      const { email, password } = request.body;

      const authenticateUser = new AuthenticateUserUseCase();

      const { user, token } = await authenticateUser.execute({
        email,
        password,
      });

      delete user.password_hash;

      return response.status(200).json({ user, token });
    } catch (error) {
      return response.status(401).json({ error: error.message });
    }
  }
}

export default new SessionController();
