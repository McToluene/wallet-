export default {
  port: parseInt(process.env.PORT || '8080', 10),
  databaseURL: process.env.POSTGRES_URL || '',
  api: {
    prefix: '/api',
  },
  broker: process.env.KAFKA_BOOSTRAP_SERVERS || 'localhost:9092',
  brokerId: process.env.KAFKA_BROKER_ID,
  topic: process.env.KAFKA_CUSTOMER_SERVICE_TOPIC || 'CUSTOMER_SERVICE',
};
