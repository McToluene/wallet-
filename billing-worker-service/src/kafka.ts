import { Kafka } from 'kafkajs';
import config from './config/config';

export default (): Kafka => {
  const kafka = new Kafka({
    clientId: config.brokerId,
    brokers: [config.broker],
  });

  return kafka;
};
