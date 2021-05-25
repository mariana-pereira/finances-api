import request from "supertest";

import app from "../../src/app";
import createConnection from "../../src/database";
import User from '../../src/models/User';
import truncate from '../../src/utils/truncate';

let connection;

describe("Users", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterEach(async () => {
    await truncate(connection);
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
      password_hash: "123456"
    });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new user with same email", async () => {
    const usersRepository = connection.getRepository(User);

    const user = usersRepository.create({
      name: "User Example",
      email: "user@example.com",
      password_hash: "123456"
    });

    await usersRepository.save(user);

    const response = await request(app).post("/users").send({
      name: "User Example",
      email: "user@example.com",
      password_hash: "123456"
    });

    expect(response.status).toBe(400);
  });
});
