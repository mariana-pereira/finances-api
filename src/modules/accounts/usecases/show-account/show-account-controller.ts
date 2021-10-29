import { Request, Response } from 'express';

import { ShowAccountUseCase } from './show-account-usecase';

class ShowAccountController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showAccount = new ShowAccountUseCase();

    const account = await showAccount.execute({ id });

    return response.status(200).json(account);
  }
}

export default new ShowAccountController();
