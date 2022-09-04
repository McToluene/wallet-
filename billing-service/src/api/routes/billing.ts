import { Router, Response, Request } from 'express';

import { TransactionType } from '../../enums/transaction-type';
import { ITransactionDto } from '../../interfaces/dto/transaction.dto';
import TransactionService from '../../services/transaction-service';

export default (app: Router, transactionService: TransactionService) => {
  app.post('/deposit', async (req: Request, res: Response) => {
    const data = req.body as ITransactionDto;
    const errors = [];
    if (!data.amount) errors.push({ message: 'amount is required' });
    if (!data.customerId) errors.push({ message: 'customerId is required' });

    // return errors
    if (errors.length > 0) return res.status(400).json({ errors });
    await transactionService.createTransaction(data, TransactionType.CREDIT);
    return res.status(201).json({ message: 'Deposit transaction initated' });
  });
};
