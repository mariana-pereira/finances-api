import { Request, Response } from 'express';

import { CreateAccountUseCase } from './create-account-usecase';

class CreateAccountController {
  public async handle (request: Request, response: Response): Promise<Response> {
    try {
      const { bank, branch, account_number, account_type } = request.body;

      console.log(bank, branch, account_number, account_type, request.user.id)

      const createAccount = new CreateAccountUseCase();

      const account = await createAccount.execute({
        bank,
        branch,
        account_number,
        account_type,
        user_id: request.user.id
      });

      return response.status(201).json(account);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new CreateAccountController();
