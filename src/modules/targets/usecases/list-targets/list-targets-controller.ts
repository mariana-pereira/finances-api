import { Request, Response } from 'express';

import { ListTargetsUseCase } from './list-targets-usecase';

class ListTargetsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listTargets = new ListTargetsUseCase();

    const targets = await listTargets.execute({ user_id });

    return response.status(200).json(targets);
  }
}

export default new ListTargetsController();
