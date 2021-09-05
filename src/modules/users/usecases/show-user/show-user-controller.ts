import { Request, Response } from 'express';

import { ShowUserUseCase } from './show-user-usecase';

class ShowUserController {
  async handle (request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const showUser = new ShowUserUseCase();

      const user = await showUser.execute({ id });

      delete user.password_hash;

      return response.status(200).json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new ShowUserController();
