import { Application } from 'express';
import data from './data';
import express from './express';

export default async (app: Application) => {
  const mongoConnection = await data();
  console.log('Db connected!');

  express(app);
};
