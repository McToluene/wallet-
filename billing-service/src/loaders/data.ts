import mongoose, { Mongoose } from 'mongoose';
import config from '../config/config';

export default async (): Promise<Mongoose> => {
  const connection = mongoose.connect(config.databaseURL);
  return connection;
};
