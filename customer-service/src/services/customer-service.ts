import { Model, ModelCtor } from 'sequelize/types';
import { ICustomerResponse } from '../interfaces/customer-response';

export default class CustomerService {
  constructor(private readonly userModel: ModelCtor<Model>) {}

  private async onAccountCredit(id: string, amount: number) {
    let user = await this.userModel.findOne({ where: { id } });
    if (user) {
      console.log(user);
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
