import { Request, Response } from 'express';
import * as Yup from 'yup';

import { CreateInvestmentUseCase } from './create-investment-usecase';

class CreateInvestmentController {
  public async handle (request: Request, response: Response): Promise<Response> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      type: Yup.string().required(),
      tax: Yup.string().required(),
      application_date: Yup.date().required(),
      redeem_date: Yup.date().required(),
      amount: Yup.number().required()
    });

    try {
      await schema.validate(request.body);

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
