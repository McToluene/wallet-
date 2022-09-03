export default {
  port: parseInt(process.env.PORT || '8081', 10),
  databaseURL:
    process.env.MONGO_URL ||
    'mongodb+srv://Jumga:qKnhBlWVbL2TtNnF@cluster0.vupbo.mongodb.net/waller?retryWrites=true&w=majority',
  api: {
    prefix: '/api',
  },
  broker: process.env.KAFKA_BOOSTRAP_SERVERS || 'localhost:9092',
  brokerId: process.env.KAFKA_BROKER_ID,
};
