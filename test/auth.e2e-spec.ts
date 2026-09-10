import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const request = require('supertest');

import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get(PrismaService);

    await app.init();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await app.close();
  });

  describe('POST /auth/register', () => {
    it('should register a user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
        })
        .expect(201);

      expect(response.body).toMatchObject({
        name: 'John Doe',
        email: 'john@example.com',
      });

      const user = await prisma.user.findUnique({
        where: {
          email: 'john@example.com',
        },
      });

      expect(user).not.toBeNull();
      expect(user?.name).toBe('John Doe');
      expect(user?.email).toBe('john@example.com');
    });
  });

  describe('POST /auth/login', () => {
    it('should login an existing user', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
        })
        .expect(201);

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'john@example.com',
          password: 'password123',
        })
        .expect(201);

      expect(response.body).toHaveProperty('token');
      expect(typeof response.body.token).toBe('string');
    });

    it('should reject login when the user does not exist', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'does-not-exist@example.com',
          password: 'password123',
        })
        .expect(500);
    });
  });

  describe('GET /auth/me', () => {
    it('should return the current user', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
        })
        .expect(201);

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'john@example.com',
          password: 'password123',
        })
        .expect(201);

      const response = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${loginResponse.body.token}`)
        .expect(200);

      expect(response.body).toMatchObject({
        name: 'John Doe',
        email: 'john@example.com',
      });
    });

    it('should return null when the authenticated user no longer exists', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
        })
        .expect(201);

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'john@example.com',
          password: 'password123',
        })
        .expect(201);

      const user = await prisma.user.findUnique({
        where: {
          email: 'john@example.com',
        },
      });

      expect(user).not.toBeNull();

      await prisma.user.delete({
        where: {
          id: user!.id,
        },
      });

      const response = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${loginResponse.body.token}`)
        .expect(200);

      expect(response.body).toEqual({});
    });
  });
});

