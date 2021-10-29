import { Request, Response } from 'express';

import { ShowUserUseCase } from './show-user-usecase';

class ShowUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUser = new ShowUserUseCase();

    const user = await showUser.execute({ id });

    delete user.password_hash;

    return response.status(200).json(user);
  }
}

export default new ShowUserController();
