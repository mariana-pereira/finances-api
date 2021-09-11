import { Request, Response } from 'express';

import { ListInvestmentsUseCase } from './list-all-investments-usecase';

class ListAllInvestmentsController {
  public async handle (request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;

      const listInvestments = new ListInvestmentsUseCase();

      const investments = await listInvestments.execute({ user_id });

      return response.status(200).json(investments);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new ListAllInvestmentsController();
