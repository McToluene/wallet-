import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import config from '../config/config';
import routes from '../api/';
import { Kafka } from 'kafkajs';
import TransactionService from '../services/transaction-service';

export default (app: Application, kafka: Kafka, transactionService: TransactionService) => {
  app.get('/status', (req, res) => {
    res.status(200).end();
  });

  app.use(cors());
  app.use(express.json());
  app.use(config.api.prefix, routes(kafka, transactionService));
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
