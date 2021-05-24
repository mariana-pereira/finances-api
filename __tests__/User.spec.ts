import request from "supertest";
import { getConnection } from "typeorm";

import app from "../src/app";
import createConnection from "../src/database";

describe("Users", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
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
    const response = await request(app).post("/users").send({
      name: "User Example",
      email: "user@example.com",
      password_hash: "123456"
    });

    expect(response.status).toBe(400);
  });
});
