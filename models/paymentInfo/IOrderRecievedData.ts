import { PaymentMethodEnum } from '../PaymentMethodEnum';
import { PricingPlanEnum } from '../PricingPlanEnum';

export interface IOrderData {
  id: 18;
  transactionID: string;
  dateTime: string;
  promoCode: string;
  orderTotal: number;
  platformFee: number;
  paymentMethod: PaymentMethodEnum;
  pricingPlan: PricingPlanEnum;
  Email: string;
  createdAt: string;
  updatedAt: string;
  hours: number;
}

export interface IOrderRecievedData {
  data: IOrderData;
  User: {
    id: number;
    firstName: string;
    lastName: string;
    contactEmail: string;
    countryRegion: string;
    phone: number;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
}
