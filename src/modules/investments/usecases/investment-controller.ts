import { Request, Response } from 'express';

import { CreateInvestmentUseCase } from './create-investment-usecase';
import { ListInvestmentsUseCase } from './list-investments-usecase';

class InvestmentController {
  public async index (request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;

      const listInvestments = new ListInvestmentsUseCase();

      const investments = await listInvestments.execute({ user_id });

      return response.status(200).json(investments);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async store (request: Request, response: Response): Promise<Response> {
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

      return response.status(201).json(investment);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new InvestmentController();
