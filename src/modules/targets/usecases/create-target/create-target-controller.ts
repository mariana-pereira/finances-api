import { Request, Response } from 'express';
import * as Yup from 'yup';

import { CreateTargetUseCase } from './create-target-usecase';

class CreateTargetController {
  public async handle (request: Request, response: Response): Promise<Response> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      deadline: Yup.date().required(),
      necessary_amount: Yup.number().required()
    });

    try {
      await schema.validate(request.body);

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

export default new CreateTargetController();
