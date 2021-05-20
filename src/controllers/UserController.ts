import { Request, Response } from 'express';

import CreateUserService from '../services/createUserService';
import ShowUserService from '../services/showUserService';

class UserController {
  public async store (request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password_hash } = request.body;

      const createUser = new CreateUserService();

      const user = await createUser.execute({
        name,
        email,
        password_hash,
      });

      delete user.password_hash;

      return response.status(200).json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async show (request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const showUser = new ShowUserService();

      const user = await showUser.execute({ id });

      delete user.password_hash;

      return response.status(200).json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
