import { Kafka } from 'kafkajs';
import { ICustomerResponse } from '../interfaces/customer-response';
import CustomerService from '../services/customer-service';

export default async (kafka: Kafka, customerService: CustomerService) => {
  const consumer = kafka.consumer({ groupId: 'transaction' });
  await consumer.connect();
  await consumer.subscribe({ topic: 'CUSTOMER_SERVICE', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const customer: ICustomerResponse = message.value
        ? JSON.parse(message.value.toString())
        : null;

      if (customer) customerService.onAccountChange(customer);
    },
  });
};
