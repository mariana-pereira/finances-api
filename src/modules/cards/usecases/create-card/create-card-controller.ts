import { Request, Response } from 'express';
import * as Yup from 'yup';

import { CreateCardUseCase } from './create-card-usecase';

class CreateCardController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      number: Yup.string().required(),
      limit: Yup.number().required(),
      expiry_day: Yup.number().required(),
    });

    await schema.validate(request.body);

    const {
      name, number, limit, expiry_day,
    } = request.body;

    const createCard = new CreateCardUseCase();

    const card = await createCard.execute({
      name,
      number,
      limit,
      expiry_day,
      user_id: request.user.id,
    });

    return response.status(201).json(card);
  }
}

export default new CreateCardController();
