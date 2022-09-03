import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import config from '../config/config';
import routes from '../api/';

export default (app: Application) => {
  app.get('/status', (req, res) => {
    res.status(200).end();
  });

  app.use(cors());
  app.use(express.json());
  app.use(config.api.prefix, routes());
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
