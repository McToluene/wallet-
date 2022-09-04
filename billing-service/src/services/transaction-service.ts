import { Kafka } from 'kafkajs';
import { TransactionStatus } from '../enums/transaction-status';
import { TransactionType } from '../enums/transaction-type';
import { IBillingWorkerResponse } from '../interfaces/billing-worker-response';
import { ITransactionDto } from '../interfaces/dto/transaction.dto';
import ITransaction from '../interfaces/transaction';
import Transaction from '../models/transaction';
import TransactionEvent from '../publisher/transactionEvent.publisher';

export default class TransactionService {
  private readonly transactionModel = Transaction;
  private readonly transactionEvent;

  constructor(kafka: Kafka) {
    this.transactionEvent = new TransactionEvent(kafka);
  }

  async createTransaction(data: ITransactionDto, type: TransactionType) {
    const preparedTransaction = this.prepareTransaction(data, type);
    const addedTransaction = new this.transactionModel(preparedTransaction);
    await addedTransaction.save();
    await this.sendTransactionDetail(addedTransaction);
  }

  async getTransactions(id: string) {
    return await this.transactionModel.find();
  }

  private async sendTransactionDetail(transaction: ITransaction) {
    await this.transactionEvent.performTransaction(transaction);
  }

  private async creditCustomer(transaction: ITransaction) {
    await this.transactionEvent.creditCustomer(transaction);
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
    const transaction = await this.transactionModel.findOneAndUpdate(
      { transactionRef: ref },
      {
        status: TransactionStatus.SUCCESSFUL,
      },
      { returnDocument: 'after' }
    );
    if (transaction) await this.creditCustomer(transaction);
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
    const status = transaction.status;
    switch (status) {
      case 'SUCCESS':
        await this.onTransactionSuccessful(transactionRef);
        break;
      case 'FAILED':
        await this.onTransactionFailed(transactionRef);
        break;
      default:
        break;
    }
  }
}
