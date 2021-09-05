import { Request, Response } from 'express';
import * as Yup from 'yup';

import { CreateUserUseCase } from './create-user-usecase';

class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      confirmPassword: Yup.string().required().min(6)
    });

    try {
      await schema.validate(request.body);

      const { name, email, password, confirmPassword } = request.body;

      if(password !== confirmPassword) {
        return response.status(400).json({ error: "Passwords don't match!" });
      }

      const createUser = new CreateUserUseCase();

      const user = await createUser.execute({
        name,
        email,
        password,
      });

      delete user.password_hash;

      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new CreateUserController();
