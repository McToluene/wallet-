import { Router } from 'express';

import TransactionService from '../services/transaction-service';
import billing from './routes/billing';

export default (transactionService: TransactionService) => {
  const app = Router();
  billing(app, transactionService);
  return app;
};
