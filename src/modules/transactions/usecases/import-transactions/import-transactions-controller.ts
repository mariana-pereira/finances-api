import { Request, Response } from 'express';

import { ImportTransactionsUseCase } from './import-transactions-usecase';

interface MulterRequest extends Request {
  file: any;
}

class ImportTransactionsController {
  public async handle(request: MulterRequest, response: Response): Promise<Response> {
    const { file } = request;
    const { account_id } = request.body;

    const importTransactions = new ImportTransactionsUseCase();

    await importTransactions.execute({ file, account_id, user_id: request.user.id });

    return response.status(201).json({ message: 'File successfully imported' });
  }
}

export default new ImportTransactionsController();
