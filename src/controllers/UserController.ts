import { Request, Response } from 'express';
import * as Yup from 'yup';

import CreateUserService from '../services/createUserService';
import DeleteUserService from '../services/deleteUserService';
import ShowUserService from '../services/showUserService';

class UserController {
  public async store (request: Request, response: Response): Promise<Response> {
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

      const createUser = new CreateUserService();

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

  public async show (request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const showUser = new ShowUserService();

      const user = await showUser.execute({ id });

      delete user.password_hash;

      return response.status(200).json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async delete (request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const deleteUser = new DeleteUserService();

      await deleteUser.execute({ id });

      return response.status(200).json({ message: 'User successfully deleted.'});
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
