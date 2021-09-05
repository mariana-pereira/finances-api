import { Request, Response } from 'express';

import { DeleteTargetUseCase } from './delete-target-usecase';

class DeleteTargetController {
  public async handle (request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const deleteTarget = new DeleteTargetUseCase();

      await deleteTarget.execute({ id });

      return response.status(200).json({ message: 'Target successfully deleted.'});
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new DeleteTargetController();
