import { TransactionStatus } from '../enums/transaction-status';
import { TransactionType } from '../enums/transaction-type';

export default interface ITransaction {
  transactionRef: string;
  amount: number;
  customerId: string;
  status: TransactionStatus;
  type: TransactionType;
  updatedAt: Date;
  createdAt: Date;
}
