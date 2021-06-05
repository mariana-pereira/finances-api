import { Request, Response } from 'express';

import CreateAccountService from '../services/createAccountService';

class AccountController {
  public async store (request: Request, response: Response): Promise<Response> {
    try {
      const { bank, branch, account_number, account_type } = request.body;

      console.log(bank, branch, account_number, account_type, request.user.id)

      const createAccount = new CreateAccountService();

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

export default new AccountController();
