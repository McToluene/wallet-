import { Kafka, Producer } from 'kafkajs';
import config from '../config/config';
import { IBillingWorkerResponse } from '../interfaces/billing-worker-response';

export default class BillingEvent {
  private readonly producer: Producer;
  constructor(kakfa: Kafka) {
    this.producer = kakfa.producer();
    this.producer.connect();
  }

  async onBillingCustomerSuccess(transactionRef: string) {
    try {
      const data: IBillingWorkerResponse = {
        status: 'SUCCESS',
        transactionRef,
      };
      await this.producer.send({
        topic: config.billingTopic,
        messages: [{ value: JSON.stringify(data) }],
      });
    } catch (error) {
      console.log(error);
    }
  }
}
