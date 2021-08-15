import { Request, Response } from 'express';

import { CreateTargetUseCase } from './create-target-usecase';
import { DeleteTargetUseCase } from './delete-target-usecase';
import { ListTargetsUseCase } from './list-targets-usecase';
import { ShowTargetUseCase } from './show-target-usecase';
import { UpdateTargetUseCase } from './update-target-usecase';

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

  public async show (request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const showTarget = new ShowTargetUseCase();

      const target = await showTarget.execute({ id });

      return response.status(200).json(target);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async update (request: Request, response: Response): Promise<Response> {
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

  public async delete (request: Request, response: Response): Promise<Response> {
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

export default new TargetController();
