export default {
  port: parseInt(process.env.PORT || '8081', 10),
  databaseURL: process.env.MONGO_URL || '',
  api: {
    prefix: '/api',
  },
  broker: process.env.KAFKA_BOOSTRAP_SERVERS || 'localhost:9092',
  brokerId: process.env.KAFKA_BROKER_ID,
  topic: process.env.KAFKA_BILLING_SERVICE_TOPIC || 'BILLING_SERVICE',
  workerTopic: process.env.KAFKA_BILLING_WORKER_SERVICE_TOPIC || 'BILLING_WORKER_SERVICE',
  customerTopic: process.env.KAFKA_CUSTOMER_SERVICE_TOPIC || 'CUSTOMER_SERVICE',
};
