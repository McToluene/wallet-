import { Router, Response, Request } from 'express';

import { TransactionType } from '../../enums/transaction-type';
import { ITransactionDto } from '../../interfaces/dto/transaction.dto';
import TransactionService from '../../services/transaction-service';

export default (app: Router, transactionService: TransactionService) => {
  app.post('/deposit', async (req: Request, res: Response) => {
    const data = req.body as ITransactionDto;
    await transactionService.createTransaction(data, TransactionType.CREDIT);
    return res.status(201).json({ message: 'Deposit transaction initate' });
  });
};
