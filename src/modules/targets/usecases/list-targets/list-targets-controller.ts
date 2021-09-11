import { Request, Response } from 'express';

import { ListTargetsUseCase } from './list-targets-usecase';

class ListTargetsController {
  public async handle (request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;

      const listTargets = new ListTargetsUseCase();

      const targets = await listTargets.execute({ user_id });

      return response.status(200).json(targets);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new ListTargetsController();
