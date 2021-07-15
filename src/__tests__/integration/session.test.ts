import bcrypt from 'bcryptjs';
import request from "supertest";

import { User } from '@modules/users/model/user';

import app from "../../app";
import createConnection from "../../database";
import { clearDb } from '../../utils/database';

let connection;

describe("Users", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterEach(async () => {
    await clearDb(connection);
  });

  afterAll(async done => {
    await connection.dropDatabase();
    await connection.close();
    done();
  });

  it('should authenticate with valid credentials', async () => {
    const usersRepository = connection.getRepository(User);

    const user = usersRepository.create({
      name: 'user',
      email: 'test@mail.com',
      password_hash: await bcrypt.hash('123123', 8)
    });

    await usersRepository.save(user);

    const response = await request(app)
      .post('/session')
      .send({
        email: user.email,
        password: '123123'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should not authenticate with invalid password', async () => {
    const usersRepository = connection.getRepository(User);

    const user = usersRepository.create({
      name: 'user',
      email: 'test@mail.com',
      password_hash: await bcrypt.hash('123123', 8)
    });

    await usersRepository.save(user);

    const response = await request(app)
      .post('/session')
      .send({
        email: user.email,
        password: '123456'
      });

    expect(response.status).toBe(401);
  });

  it('should not authenticate with invalid email', async () => {
    const usersRepository = connection.getRepository(User);

    const user = usersRepository.create({
      name: 'user',
      email: 'test@mail.com',
      password_hash: await bcrypt.hash('123123', 8)
    });

    await usersRepository.save(user);

    const response = await request(app)
      .post('/session')
      .send({
        email: 'invalid_email@mail.com',
        password: '123123'
      });

    expect(response.status).toBe(401);
  });
});
