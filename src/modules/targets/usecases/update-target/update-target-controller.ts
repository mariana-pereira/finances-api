import { Request, Response } from 'express';

import { UpdateTargetUseCase } from './update-target-usecase';

class UpdateTargetController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, deadline, necessary_amount } = request.body;

    const updateTarget = new UpdateTargetUseCase();

    const target = await updateTarget.execute({
      id,
      name,
      deadline,
      necessary_amount,
    });

    return response.status(200).json(target);
  }
}

export default new UpdateTargetController();
