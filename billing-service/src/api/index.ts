import { Router } from 'express';
import { Kafka } from 'kafkajs';
import TransactionService from '../services/transaction-service';
import billing from './routes/billing';

export default (kafka: Kafka, transactionService: TransactionService) => {
  const app = Router();
  billing(app, kafka, transactionService);
  return app;
};
