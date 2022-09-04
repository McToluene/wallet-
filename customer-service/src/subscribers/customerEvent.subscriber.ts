import { Kafka } from 'kafkajs';
import { ICustomerResponse } from '../interfaces/customer-response';
import CustomerService from '../services/customer-service';
import config from '../config/config';

export default async (kafka: Kafka, customerService: CustomerService) => {
  const consumer = kafka.consumer({ groupId: 'customer' });
  await consumer.connect();
  await consumer.subscribe({ topic: config.topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const customer: ICustomerResponse = message.value
        ? JSON.parse(message.value.toString())
        : null;

      if (customer) customerService.onAccountChange(customer);
    },
  });
};
