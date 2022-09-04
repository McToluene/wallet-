import { Kafka } from 'kafkajs';
import { IBillingWorkerRequest } from '../interfaces/billing-worker-request';
import BillingService from '../service/billing-service';

export default async (kafka: Kafka, billingService: BillingService) => {
  const consumer = kafka.consumer({ groupId: 'billing' });
  await consumer.connect();
  await consumer.subscribe({ topic: 'BILLING_WORKER_SERVICE', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const transcton: IBillingWorkerRequest = message.value
        ? JSON.parse(message.value.toString())
        : null;

      if (transcton) {
        billingService.deposit(transcton);
      }
    },
  });
};
