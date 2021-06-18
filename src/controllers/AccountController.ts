import { Request, Response } from 'express';

import CreateAccountService from '../services/account/createAccountService';
import DeleteAccountService from '../services/account/deleteAccountService';
import ListAccountsService from '../services/account/listAccountsService';
import ShowAccountService from '../services/account/showAccountService';


class AccountController {
  public async index (request: Request, response: Response): Promise<Response> {
    try {
      const listAccounts = new ListAccountsService();

      const accounts = await listAccounts.execute();

      return response.status(200).json(accounts);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

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

  public async show (request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const showAccount = new ShowAccountService();

      const account = await showAccount.execute({ id });

      return response.status(200).json(account);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async delete (request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const deleteAccount = new DeleteAccountService();

      await deleteAccount.execute({ id });

      return response.status(200).json({ message: 'Account successfully deleted.'});
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new AccountController();
