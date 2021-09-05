import { Request, Response } from 'express';

import { ShowTargetUseCase } from './show-target-usecase';

class ShowTargetController {
  public async handle (request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const showTarget = new ShowTargetUseCase();

      const target = await showTarget.execute({ id });

      return response.status(200).json(target);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new ShowTargetController();
