import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import AppError from '@errors/AppError';
import createConnection from './database';
import routes from './routes';

import 'reflect-metadata';

class App {
  public express: express.Application;

  constructor() {
    createConnection();
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes(): void {
    this.express.use(routes);

    this.express.use((err: Error, request: Request, response: Response, _: NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          status: 'error',
          message: err.message,
        });
      }

      return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    });
  }
}

export default new App().express;
