import { Kafka, Producer } from 'kafkajs';

import { IBillingWorkerRequest } from '../interfaces/billing-worker-request';
import { ICustomerRequest } from '../interfaces/dto/customer.request';
import ITransaction from '../interfaces/transaction';

export default class TransactionEvent {
  private readonly producer: Producer;
  constructor(kakfa: Kafka) {
    this.producer = kakfa.producer();
    this.producer.connect();
  }

  async billCustomer(transaction: ITransaction) {
    try {
      const data: IBillingWorkerRequest = {
        amount: transaction.amount,
        customerId: transaction.customerId,
        transactionRef: transaction.transactionRef,
      };
      await this.producer.send({
        topic: 'BILLING_WORKER_SERVICE',
        messages: [{ value: JSON.stringify(data) }],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async creditCustomer(transaction: ITransaction) {
    const data: ICustomerRequest = {
      amount: transaction.amount,
      customerId: transaction.customerId,
      type: 'CREDIT',
    };
    try {
      await this.producer.send({
        topic: 'CUSTOMER_SERVICE',
        messages: [{ value: JSON.stringify(data) }],
      });
    } catch (error) {
      console.log(error);
    }
  }
}
