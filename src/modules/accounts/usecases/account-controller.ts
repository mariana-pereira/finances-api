import { Request, Response } from 'express';

import { CreateAccountUseCase } from './create-account-usecase';
import { DeleteAccountUseCase } from './delete-account-usecase';
import { ListAccountsUseCase } from './list-accounts-usecase';
import { ShowAccountUseCase } from './show-account-usecase';
import { UpdateAccountUseCase } from './update-account-usecase';

class AccountController {
  public async index (request: Request, response: Response): Promise<Response> {
    try {
      const listAccounts = new ListAccountsUseCase();

      const user_id = request.user.id;

      const accounts = await listAccounts.execute({ user_id });

      return response.status(200).json(accounts);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async store (request: Request, response: Response): Promise<Response> {
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

  public async show (request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const showAccount = new ShowAccountUseCase();

      const account = await showAccount.execute({ id });

      return response.status(200).json(account);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async update (request: Request, response: Response): Promise<Response> {
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

  public async delete (request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const deleteAccount = new DeleteAccountUseCase();

      await deleteAccount.execute({ id });

      return response.status(200).json({ message: 'Account successfully deleted.'});
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new AccountController();
