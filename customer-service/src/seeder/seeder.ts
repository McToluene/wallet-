import { ModelCtor, Model } from 'sequelize';

const seeder = async (db: ModelCtor<Model>) => {
  const users = await db.findAndCountAll();
  if (users.count <= 0) {
    const data = {
      name: 'OJ',
      email: 'toluenelarry@gmail.com',
      balance: 300,
    };
    await db.create(data);
    console.log('Data seeded');
  }
};

export default seeder;
