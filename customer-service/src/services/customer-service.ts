import { Model, ModelCtor } from 'sequelize/types';
import { ICustomerResponse } from '../interfaces/customer-response';
import { IUser } from '../interfaces/model/IUser';

export default class CustomerService {
  constructor(private readonly userModel: ModelCtor<Model>) {}

  private async onAccountCredit(id: string, amount: number) {
    let user = await this.userModel.findOne({ where: { id } });
    if (user) {
      const values = user.toJSON<IUser>();
      const balance = amount + parseInt(values.balance);
      await this.userModel.update({ balance }, { where: { id } });
    }
  }

  async onAccountChange(data: ICustomerResponse) {
    const status = data.type;
    switch (status) {
      case 'CREDIT':
        await this.onAccountCredit(data.customerId, data.amount);
        break;
      default:
        break;
    }
  }
}
