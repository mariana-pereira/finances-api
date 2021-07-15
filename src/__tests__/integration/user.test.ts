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

  it("should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      name: "User Example",
      email: "user@example.com",
      password: "123456",
      confirmPassword: "123456"
    });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new user if passwords don't match", async () => {
    const response = await request(app).post("/users").send({
      name: "User Example",
      email: "user@example.com",
      password: "123456",
      confirmPassword: "123123"
    });

    expect(response.status).toBe(400);
  });

  it("should not be able to create a new user with same email", async () => {
    const usersRepository = connection.getRepository(User);

    const user = usersRepository.create({
      name: "User Example",
      email: "user@example.com",
      password_hash: "123456",
    });

    await usersRepository.save(user);

    const response = await request(app).post("/users").send({
      name: "User Example",
      email: "user@example.com",
      password: "123456",
      confirmPassword: "123456"
    });

    expect(response.status).toBe(400);
  });

  it('should encrypt user password', async () => {
    const usersRepository = connection.getRepository(User);

    const user = usersRepository.create({
      name: "User Example",
      email: "user@example.com",
      password_hash: await bcrypt.hash('123456', 8)
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  // it("should return an user when a valid id is provided", async () => {
  //   const usersRepository = connection.getRepository(User);

  //   const user = usersRepository.create({
  //     name: "User Example",
  //     email: "user@example.com",
  //     password_hash: "123456"
  //   });

  //   await usersRepository.save(user);

  //   await request(app)
  //     .get(`/users/${user.id}`)
  //     .auth('dldkasjalasu', { type: 'bearer' })
  //     .expect(200);

  // });

  // it("should not return an user when an invalid id is provided", async () => {
  //   const usersRepository = connection.getRepository(User);

  //   const user = usersRepository.create({
  //     name: "User Example",
  //     email: "user@example.com",
  //     password_hash: "123456"
  //   });

  //   await usersRepository.save(user);

  //   await request(app).get('/users/b16f1e3c-3142-4946-83e0-a57f3c7e45a6')
  //     .expect(400);
  // });

  // it("should delete the user when a valid id is provided", async () => {
  //   const usersRepository = connection.getRepository(User);

  //   const user = usersRepository.create({
  //     name: "User Example",
  //     email: "user@example.com",
  //     password_hash: "123456"
  //   });

  //   await usersRepository.save(user);

  //   await request(app).delete(`/users/${user.id}`)
  //     .expect(200);

  // });

  // it("should not delete an user when an invalid id is provided", async () => {
  //   const usersRepository = connection.getRepository(User);

  //   const user = usersRepository.create({
  //     name: "User Example",
  //     email: "user@example.com",
  //     password_hash: "123456"
  //   });

  //   await usersRepository.save(user);

  //   await request(app).delete('/users/b16f1e3c-3142-4946-83e0-a57f3c7e45a6')
  //     .expect(400);
  // });
});
