import { Request, Response } from 'express';

import { CreateTransactionUseCase } from './create-transaction-usecase';
import { ListTransactionsUseCase } from './list-transactions-usecase';

class TransactionController {
  public async index (request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;

      const listTransactions = new ListTransactionsUseCase();

      const transactions = await listTransactions.execute({ user_id });

      return response.status(200).json(transactions);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async store (request: Request, response: Response): Promise<Response> {
    try {
      const { date, amount, type, category, source, account_id } = request.body;

      const createTransaction = new CreateTransactionUseCase();

      const transaction = await createTransaction.execute({
        date,
        amount,
        type,
        category,
        source,
        account_id,
        user_id: request.user.id
      });

      return response.status(201).json(transaction);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new TransactionController();
