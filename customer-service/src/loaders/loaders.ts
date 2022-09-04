import { Application } from 'express';

import User from '../models/user';
import CustomerService from '../services/customer-service';
import data from './data';
import express from './express';
import kafka from './kafka';
import custerEvent from '../subscribers/customerEvent.subscriber';

export default async (app: Application) => {
  const kafkaLoaded = kafka();

  const db = data();
  console.log('Db connected!');

  const user = User(db);
  const customerService = new CustomerService(user);
  await custerEvent(kafkaLoaded, customerService);
  console.log('Subscriber loaded!');

  express(app);
  console.log('Express loaded!');
};
