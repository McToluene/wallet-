import { Kafka } from 'kafkajs';
import { IBillingWorkerResponse } from '../interfaces/billing-worker-response';
import TransactionService from '../services/transaction-service';

export default async (kafka: Kafka, transactionService: TransactionService) => {
  const consumer = kafka.consumer({ groupId: 'transaction' });
  await consumer.connect();
  await consumer.subscribe({ topic: 'BILLING_SERVICE', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });

      const transcton: IBillingWorkerResponse = message.value
        ? JSON.parse(message.value.toString())
        : null;

      if (transcton) {
        transactionService.onPaymentComplete(transcton);
      }
    },
  });
};
