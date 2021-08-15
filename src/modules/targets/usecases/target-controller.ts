import { Request, Response } from 'express';

import { CreateTargetUseCase } from './create-target-usecase';
import { ListTargetsUseCase } from './list-targets-usecase';

class TargetController {
  public async index (request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;

      const listTargets = new ListTargetsUseCase();

      const targets = await listTargets.execute({ user_id });

      return response.status(200).json(targets);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async store (request: Request, response: Response): Promise<Response> {
    try {
      const { name, deadline, necessary_amount } = request.body;

      const createTarget = new CreateTargetUseCase();

      const account = await createTarget.execute({
        name,
        deadline,
        necessary_amount,
        user_id: request.user.id
      });

      return response.status(201).json(account);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new TargetController();
