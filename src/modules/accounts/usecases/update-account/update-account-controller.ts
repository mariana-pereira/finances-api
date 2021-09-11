import { Request, Response } from 'express';

import { UpdateAccountUseCase } from './update-account-usecase';

class UpdateAccountController {
  public async handle (request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { bank, branch, account_number, account_type } = request.body;

      const updateAccount = new UpdateAccountUseCase();

      const account = await updateAccount.execute({
        id,
        bank,
        branch,
        account_number,
        account_type
      });

      return response.status(200).json(account);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new UpdateAccountController();
