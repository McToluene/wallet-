import { Application } from 'express';
import TransactionService from '../services/transaction-service';
import transactionEventSubscriber from '../subscribers/transactionEvent.subscriber';

import data from './data';
import express from './express';
import kafka from './kafka';

export default async (app: Application) => {
  await data();
  console.log('Db connected!');

  // should load a DI here but it's like a overkill for the small app
  const kafkaLoaded = kafka();
  const transactionService = new TransactionService(kafkaLoaded);
  await transactionEventSubscriber(kafkaLoaded, transactionService);
  console.log('Subscriber loaded!');

  express(app, transactionService);
  console.log('Express loaded!');
};
