import { Kafka } from 'kafkajs';
import config from '../config/config';
import { IBillingWorkerResponse } from '../interfaces/billing-worker-response';
import TransactionService from '../services/transaction-service';

export default async (kafka: Kafka, transactionService: TransactionService) => {
  const consumer = kafka.consumer({ groupId: 'transaction' });
  await consumer.connect();
  await consumer.subscribe({ topic: config.topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const transcton: IBillingWorkerResponse = message.value
        ? JSON.parse(message.value.toString())
        : null;

      if (transcton) {
        transactionService.onPaymentComplete(transcton);
      }
    },
  });
};
