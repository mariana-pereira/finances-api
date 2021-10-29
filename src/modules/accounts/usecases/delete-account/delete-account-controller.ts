import { Request, Response } from 'express';

import { DeleteAccountUseCase } from './delete-account-usecase';

class DeleteAccountController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAccount = new DeleteAccountUseCase();

    await deleteAccount.execute({ id });

    return response.status(200).json({ message: 'Account successfully deleted.' });
  }
}

export default new DeleteAccountController();
