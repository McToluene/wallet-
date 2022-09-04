import { IBillingWorkerRequest } from '../interfaces/billing-worker-request';
import BillingEvent from '../publisher/billingEvent.publisher';

export default class BillingService {
  constructor(private readonly billingEvent: BillingEvent) {}

  async deposit(data: IBillingWorkerRequest) {
    await new Promise((res, rej) => {
      setTimeout(() => res(this.billingEvent.onBillingCustomerSuccess(data.transactionRef)), 1000);
    });
  }
}
