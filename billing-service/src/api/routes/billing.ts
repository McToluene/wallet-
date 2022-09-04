import { Router, Response, Request } from 'express';
import { Kafka } from 'kafkajs';
import { TransactionType } from '../../enums/transaction-type';
import { ITransactionDto } from '../../interfaces/dto/transaction.dto';
import TransactionEvent from '../../publisher/transactionEvent.publisher';
import TransactionService from '../../services/transaction-service';

export default (app: Router, kafka: Kafka, transactionService: TransactionService) => {
  const transactionEvent = new TransactionEvent(kafka);

  app.post('/deposit', async (req: Request, res: Response) => {
    const data = req.body as ITransactionDto;
    await transactionService.createTransaction(data, TransactionType.CREDIT);
    return res.status(201).json({ message: 'Deposit transaction initate' });
  });
};
