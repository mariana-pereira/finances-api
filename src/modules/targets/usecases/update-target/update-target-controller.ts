import { Request, Response } from 'express';

import { UpdateTargetUseCase } from './update-target-usecase';

class UpdateTargetController {
  public async handle (request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { name, deadline, necessary_amount } = request.body;
      console.log(id);

      const updateTarget = new UpdateTargetUseCase();

      const target = await updateTarget.execute({
        id,
        name,
        deadline,
        necessary_amount
      });

      return response.status(200).json(target);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new UpdateTargetController();
