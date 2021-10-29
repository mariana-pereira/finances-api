import { Request, Response } from 'express';

import { ListAllTransactionsUseCase } from './list-all-transactions-usecase';

class ListAllTransactionsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listTransactions = new ListAllTransactionsUseCase();

    const transactions = await listTransactions.execute({ user_id });

    return response.status(200).json(transactions);
  }
}

export default new ListAllTransactionsController();
