import { Sequelize } from 'sequelize';
import config from '../config/config';

export default (): Sequelize => {
  const db = new Sequelize(config.databaseURL, { dialect: 'postgres' });
  return db;
};
