import { Request, Response } from 'express';

import { ShowAccountUseCase } from './show-account-usecase';

class ShowAccountController {
  public async handle (request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const showAccount = new ShowAccountUseCase();

      const account = await showAccount.execute({ id });

      return response.status(200).json(account);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new ShowAccountController();
