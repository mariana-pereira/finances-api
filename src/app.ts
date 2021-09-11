import cors from 'cors';
import express from 'express';

import createConnection from './database';
import routes from './routes';

import 'reflect-metadata';

class App {
  public express: express.Application;

  constructor() {
    createConnection();
    this.express = express();
    this.middlewares();
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes (): void {
    this.express.use(routes);
  }
}

export default new App().express
