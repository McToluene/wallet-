import { Application } from 'express';
import TransactionService from '../services/transaction-service';
import transactionEventSubscriber from '../subscribers/transactionEvent.subscriber';

import data from './data';
import express from './express';
import kafka from './kafka';

export default async (app: Application) => {
  await data();
  console.log('Db connected!');

  // should load a DI here but for a small app this will still work
  const kafkaLoaded = kafka();
  const transactionService = new TransactionService();
  await transactionEventSubscriber(kafkaLoaded, transactionService);
  console.log('Subscriber loaded!');

  express(app, kafkaLoaded, transactionService);
  console.log('Express loaded!');
};
