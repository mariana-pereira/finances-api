import { Request, Response } from 'express';
import * as Yup from 'yup';

import { CreateTransactionUseCase } from './create-transaction-usecase';

class CreateTransactionController {
  public async handle (request: Request, response: Response): Promise<Response> {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      amount: Yup.number().required(),
      type: Yup.string().required(),
      category: Yup.string().required(),
      source: Yup.string().required()
    });

    try {
      await schema.validate(request.body);

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

export default new CreateTransactionController();
