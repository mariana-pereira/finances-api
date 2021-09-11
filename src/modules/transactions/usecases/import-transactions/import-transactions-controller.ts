import { Request, Response } from 'express';

import { ImportTransactionsUseCase } from './import-transactions-usecase';

class ImportTransactionsController {
  public async handle (request: Request, response: Response): Promise<Response> {
    try {
      const { file } = request;
      const { account_id } = request.body;

      const importTransactions = new ImportTransactionsUseCase();

      await importTransactions.execute({ file, account_id, user_id: request.user.id });

      return response.status(201).json({ message: 'File successfully imported' });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new ImportTransactionsController();
