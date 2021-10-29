import { Request, Response } from 'express';

import { DeleteUserUseCase } from './delete-user-usecase';

class DeleteUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUser = new DeleteUserUseCase();

    await deleteUser.execute({ id });

    return response.status(200).json({ message: 'User successfully deleted.' });
  }
}

export default new DeleteUserController();
