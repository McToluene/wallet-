import { Sequelize, DataTypes } from 'sequelize';

const User = (db: Sequelize) => {
  const user = db.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    balance: DataTypes.DOUBLE,
  });
  return user;
};

export default User;
