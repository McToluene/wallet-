export default {
  broker: process.env.KAFKA_BOOSTRAP_SERVERS || 'localhost:9092',
  brokerId: process.env.KAFKA_BROKER_ID,
  topic: process.env.KAFKA_TOPIC || 'BILLING_WORKER_SERVICE',
};
