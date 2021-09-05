import { Request, Response } from 'express';

import { ListAllTransactionsUseCase } from './list-all-transactions-usecase';

class ListAllTransactionsController {
  public async handle (request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;

      const listTransactions = new ListAllTransactionsUseCase();

      const transactions = await listTransactions.execute({ user_id });

      return response.status(200).json(transactions);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new ListAllTransactionsController();
