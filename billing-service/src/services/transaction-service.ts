import { TransactionStatus } from '../enums/transaction-status';
import { TransactionType } from '../enums/transaction-type';
import { IBillingWorkerResponse } from '../interfaces/billing-worker-response';
import { ITransactionDto } from '../interfaces/dto/transaction.dto';
import Transaction from '../models/transaction';

export default class TransactionService {
  private readonly transactionModel = Transaction;

  async createTransaction(data: ITransactionDto, type: TransactionType) {
    const preparedTransaction = this.prepareTransaction(data, type);
    const addedTransaction = new this.transactionModel(preparedTransaction);
    return await addedTransaction.save();
  }

  private prepareTransaction(data: ITransactionDto, type: TransactionType) {
    const transaction = {
      transactionRef: Date.now(),
      amount: data.amount,
      customerId: data.customerId,
      type,
      status: TransactionStatus.PENDING,
    };
    return transaction;
  }

  private async onTransactionSuccessful(ref: string) {
    await this.transactionModel.findOneAndUpdate(
      { transactionRef: ref },
      {
        status: TransactionStatus.SUCCESSFUL,
      }
    );
  }

  private async onTransactionFailed(ref: string) {
    await this.transactionModel.findOneAndUpdate(
      { transactionRef: ref },
      {
        status: TransactionStatus.FAILED,
      }
    );
  }

  async onPaymentComplete(transaction: IBillingWorkerResponse) {
    const transactionRef = transaction.transactionRef;
    if (transaction.status === 'SUCCESS') await this.onTransactionSuccessful(transactionRef);
    else if (transaction.status === 'FAILED') await this.onTransactionFailed(transactionRef);
  }
}
