import subscriber from './subscriber/billingEvent.subscriber';
import kafka from './kafka';

import BillingService from './service/billing-service';
import BillingEvent from './publisher/billingEvent.publisher';

const run = async () => {
  try {
    const kafkaLoaded = kafka();
    const billingEvent = new BillingEvent(kafkaLoaded);
    const bilingService = new BillingService(billingEvent);
    await subscriber(kafkaLoaded, bilingService);

    console.log('Worker started');
  } catch (error) {
    console.log('Worker error', error);
  }
};
run();
