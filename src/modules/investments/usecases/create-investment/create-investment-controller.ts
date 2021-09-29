import { Request, Response } from 'express';

import { CreateInvestmentUseCase } from './create-investment-usecase';

class CreateInvestmentController {
  public async handle (request: Request, response: Response): Promise<Response> {
    try {
      const { name, type, tax, application_date, redeem_date, amount, account_id, target_id } = request.body;

      const createInvestment = new CreateInvestmentUseCase();

      const investment = await createInvestment.execute({
        name,
        type,
        tax,
        application_date,
        redeem_date,
        amount,
        account_id,
        target_id,
        user_id: request.user.id
      });

      if(!investment) {
        return response.status(400).json({ error: 'Investment creation failed.' });
      }

      return response.status(201).json(investment);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new CreateInvestmentController();
