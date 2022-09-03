export interface IBillingWorkerRequest {
  transactionRef: string;
  amount: number;
  customerId: string;
}
