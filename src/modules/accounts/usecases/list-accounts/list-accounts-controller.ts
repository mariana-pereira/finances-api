import { Request, Response } from 'express';

import { ListAccountsUseCase } from './list-accounts-usecase';

class ListAccountsController {
  public async handle (request: Request, response: Response): Promise<Response> {
    try {
      const listAccounts = new ListAccountsUseCase();

      const user_id = request.user.id;

      const accounts = await listAccounts.execute({ user_id });

      return response.status(200).json(accounts);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new ListAccountsController();
