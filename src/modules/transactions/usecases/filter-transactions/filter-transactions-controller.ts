import { Request, Response } from 'express';

import { FilterTransactionsUseCase } from './filter-transactions-usecase';

class FilterTransactionsController {
  public async handle (request: Request, response: Response): Promise<Response> {
    try {
      const { type, category, source, start_date, end_date }= request.query;

      const filterTransactions = new FilterTransactionsUseCase();

      const transactions = await filterTransactions.execute({ type, category, source, start_date, end_date });

      return response.status(200).json(transactions);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new FilterTransactionsController();
